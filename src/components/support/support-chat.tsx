'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import io, { Socket } from 'socket.io-client';
import Cookies from 'js-cookie';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/Input';
import { Separator } from '@/components/ui/separator';
import {
  LuMessageCircle,
  LuBot,
  LuUser,
  LuSend,
  LuX,
  LuMaximize2,
  LuMinimize2
} from 'react-icons/lu';
import { IoIosHelpCircleOutline } from 'react-icons/io';
import Button from '../ui/Button';

interface Message {
  id: string;
  message: string;
  from: 'user' | 'support' | 'agent';
  createdAt: string;
  timestamp?: Date;
  tempId?: number;
}

interface CommonQuestion {
  id: string;
  question: string;
  answer: string;
}

const commonQuestions: CommonQuestion[] = [
  {
    id: '1',
    question: 'كيف يمكنني إنشاء حساب جديد؟',
    answer: 'يمكنك إنشاء حساب جديد من خلال النقر على "إنشاء حساب" في صفحة تسجيل الدخول وإدخال المعلومات المطلوبة.'
  },
  {
    id: '2',
    question: 'نسيت كلمة المرور، ماذا أفعل؟',
    answer: 'يمكنك إعادة تعيين كلمة المرور من خلال النقر على "نسيت كلمة المرور" في صفحة تسجيل الدخول.'
  },
  {
    id: '3',
    question: 'كيف يمكنني تحديث معلومات حسابي؟',
    answer: 'يمكنك تحديث معلومات حسابك من خلال الذهاب إلى الإعدادات في لوحة التحكم الخاصة بك.'
  }
];

export function SupportChat() {
  const t = useTranslations('Support');
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [authError, setAuthError] = useState('');
  const [showAuthPanel, setShowAuthPanel] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // محاولة الاتصال تلقائياً عند تحميل المكون
  useEffect(() => {
    const token = Cookies.get('access_token');
    if (token) {
      connectToSocket(token);
    } else {
      setShowAuthPanel(true);
      setAuthError('لم يتم العثور على توكن المصادقة. يرجى تسجيل الدخول أولاً.');
    }
  }, []);

  const connectToSocket = (token: string) => {
    if (socket) {
      socket.disconnect();
    }

    setIsConnecting(true);
    setAuthError('');

    const newSocket = io('http://localhost:5000/support', {
      auth: { token },
      transports: ['websocket'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    newSocket.on('connect', () => {
      console.log('تم الاتصال بالخادم');

      setIsConnected(true);
      setIsConnecting(false);
      setShowAuthPanel(false);
      setSocket(newSocket);

      // إضافة رسالة ترحيب
      addSystemMessage('تم الاتصال بنجاح بخدمة الدعم الفني');
    });

    newSocket.on('connect_error', (err) => {
      console.error('خطأ في الاتصال:', err);
      setAuthError(`خطأ في الاتصال: ${err.message}`);
      setIsConnecting(false);
      setIsConnected(false);
      setShowAuthPanel(true);
    });

    newSocket.on('disconnect', () => {
      console.log('انقطع الاتصال بالخادم');
      setIsConnected(false);
      addSystemMessage('انقطع الاتصال بالخادم');
    });

    newSocket.on('new_reply', (message) => {
      console.log('تم استقبال رد جديد:', message);
      const newMsg: Message = {
        ...message,
        timestamp: new Date(message.createdAt)
      };
      setMessages(prev => [...prev, newMsg]);
    });

    newSocket.on('initial_messages', (initialMessages) => {
      console.log('الرسائل الأولية:', initialMessages);
      const formattedMessages = initialMessages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.createdAt)
      }));
      setMessages(formattedMessages);
    });

    newSocket.on('error', (err) => {
      console.error('خطأ:', err);
      addSystemMessage(`خطأ: ${err.message}`);
    });

    newSocket.on('typing', () => {
      setIsTyping(true);
    });

    newSocket.on('stop_typing', () => {
      setIsTyping(false);
    });
  };

  const handleRetryConnection = () => {
    const token = Cookies.get('access_token');
    if (token) {
      connectToSocket(token);
    } else {
      setAuthError('لم يتم العثور على توكن المصادقة. يرجى تسجيل الدخول أولاً.');
    }
  };

  const addSystemMessage = (text: string) => {
    const systemMsg: Message = {
      id: Date.now().toString(),
      message: text,
      from: 'agent',
      createdAt: new Date().toISOString(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, systemMsg]);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !socket || !isConnected) return;

    const tempId = Date.now();
    const userMessage: Message = {
      id: tempId.toString(),
      message: newMessage,
      from: 'user',
      createdAt: new Date().toISOString(),
      timestamp: new Date(),
      tempId
    };

    // إضافة الرسالة مؤقتاً للواجهة
    setMessages(prev => [...prev, userMessage]);
    const messageToSend = newMessage;
    setNewMessage('');

    // إرسال الرسالة للخادم
    socket.emit('support_message', {
      message: messageToSend
    }, (response: any) => {
      if (response && response.error) {
        addSystemMessage(`خطأ: ${response.error}`);
        // إزالة الرسالة المؤقتة في حالة الخطأ
        setMessages(prev => prev.filter(m => m.tempId !== tempId));
      } else if (response) {
        // استبدال الرسالة المؤقتة بالرسالة الحقيقية من الخادم
        setMessages(prev => prev.map(m =>
          m.tempId === tempId
            ? { ...response, timestamp: new Date(response.createdAt) }
            : m
        ));
      }
    });
  };

  const handleQuestionClick = (question: CommonQuestion) => {
    if (!socket || !isConnected) return;

    const tempId = Date.now();
    const userMessage: Message = {
      id: tempId.toString(),
      message: question.question,
      from: 'user',
      createdAt: new Date().toISOString(),
      timestamp: new Date(),
      tempId
    };

    setMessages(prev => [...prev, userMessage]);

    socket.emit('support_message', {
      message: question.question
    }, (response: any) => {
      if (response && response.error) {
        addSystemMessage(`خطأ: ${response.error}`);
        setMessages(prev => prev.filter(m => m.tempId !== tempId));
      } else if (response) {
        setMessages(prev => prev.map(m =>
          m.tempId === tempId
            ? { ...response, timestamp: new Date(response.createdAt) }
            : m
        ));
      }
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);

    if (socket && isConnected) {
      socket.emit('typing');

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        socket.emit('stop_typing');
      }, 1000);
    }
  };

  // تنظيف Socket عند إلغاء تحميل المكون
  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [socket]);

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.button
              onClick={() => setIsOpen(true)}
              className="relative cursor-pointer rounded-full w-14 h-14 bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-2xl dark:shadow-blue-900/30 transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              <LuMessageCircle className="h-6 w-6 drop-shadow-sm" />

              <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 hover:opacity-30 transition-opacity pointer-events-none"></span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? 'auto' : '500px',
            }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-80 md:w-96"
          >
            <Card className="shadow-2xl bg-white dark:bg-gray-900 border-2 border-blue-200 dark:border-blue-800">
              {/* Header */}
              <CardHeader className="pb-3 bg-blue-50 dark:bg-blue-900/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
                      <LuBot className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                    </div>
                    <div>
                      <CardTitle className="text-sm text-blue-700 dark:text-blue-200">
                        {t('Support Chat')}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <div
                          className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'
                            }`}
                        ></div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {isConnected ? t('Connected') : t('Disconnected')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMinimized(!isMinimized)}
                      className="h-8 w-8 p-0 text-blue-600 dark:text-blue-300"
                    >
                      {isMinimized ? (
                        <LuMaximize2 className="h-4 w-4" />
                      ) : (
                        <LuMinimize2 className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                    >
                      <LuX className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <AnimatePresence>
                {!isMinimized && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <CardContent className="p-0">
                      {/* Auth Panel */}
                      {showAuthPanel && (
                        <div className="p-6 text-center">
                          <div className="mb-4">
                            <LuBot className="h-16 w-16 mx-auto text-blue-500 mb-4" />
                            <h3 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-200">
                              {t('Support Service')}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                              {authError || t('Connecting to support')}
                            </p>
                          </div>

                          {authError && (
                            <Button
                              onClick={handleRetryConnection}
                              disabled={isConnecting}
                              className="w-full bg-blue-500 hover:bg-blue-600"
                            >
                              {isConnecting ? t('Connectin') : t('Retry')}
                            </Button>
                          )}

                          {!authError && isConnecting && (
                            <div className="flex items-center justify-center">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Messages */}
                      {!showAuthPanel && (
                        <>
                          <div className="h-80 overflow-y-auto p-4 space-y-4">
                            {messages.map((message) => (
                              <motion.div
                                key={message.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'
                                  }`}
                              >
                                <div
                                  className={`flex items-start space-x-2 max-w-[80%] ${message.from === 'user'
                                    ? 'flex-row-reverse space-x-reverse'
                                    : ''
                                    }`}
                                >
                                  <div
                                    className={`flex items-center justify-center rounded-full overflow-hidden shrink-0 
                                  ${message.from === 'user'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200'
                                      }`}
                                    style={{ width: '32px', height: '32px' }}
                                  >
                                    {message.from === 'user' ? (
                                      <LuUser className="w-[18px] h-[18px]" />
                                    ) : (
                                      <LuBot className="w-[18px] h-[18px]" />
                                    )}
                                  </div>

                                  <div
                                    className={`rounded-lg p-3 ${message.from === 'user'
                                      ? 'bg-blue-500 text-white'
                                      : 'bg-blue-50 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200'
                                      }`}
                                  >
                                    <p className="text-sm">{message.message}</p>
                                    <p className="text-xs opacity-70 mt-1">
                                      {message.timestamp
                                        ? message.timestamp.toLocaleTimeString([], {
                                          hour: '2-digit',
                                          minute: '2-digit',
                                        })
                                        : new Date(message.createdAt).toLocaleTimeString([], {
                                          hour: '2-digit',
                                          minute: '2-digit',
                                        })}
                                      {message.from === 'support'
                                        ? ` ${t('Support')}`
                                        : message.from === 'user'
                                          ? ` ${t('You')}`
                                          : ''}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            ))}

                            {isTyping && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex justify-start"
                              >
                                <div className="flex items-start space-x-2">
                                  <div className="h-8 w-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center text-blue-700 dark:text-blue-200">
                                    <LuBot className="h-4 w-4" />
                                  </div>
                                  <div className="bg-blue-50 dark:bg-blue-900/40 rounded-lg p-3">
                                    <div className="flex space-x-1">
                                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                                      <div
                                        className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                                        style={{ animationDelay: '0.1s' }}
                                      ></div>
                                      <div
                                        className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                                        style={{ animationDelay: '0.2s' }}
                                      ></div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                          </div>

                          <Separator className="bg-blue-200 dark:bg-blue-800" />

                          {/* Common Questions */}
                          {messages.length === 0 && (
                            <div className="p-4 border-b border-blue-200 dark:border-blue-800">
                              <h4 className="text-sm font-medium mb-3 flex items-center text-blue-700 dark:text-blue-200">
                                <IoIosHelpCircleOutline className="h-4 w-4 mr-2" />
                                {t('Common Questions')}
                              </h4>
                              <div className="space-y-2">
                                {commonQuestions.map((q) => (
                                  <Button
                                    key={q.id}
                                    variant="outline"
                                    size="sm"
                                    className="w-full text-left justify-start h-auto p-2 text-xs border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                                    onClick={() => handleQuestionClick(q)}
                                    disabled={!isConnected}
                                  >
                                    {q.question}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Input */}
                          <div className="p-4">
                            <div className="flex space-x-2">
                              <Input
                                placeholder={t('Type your message here')}
                                value={newMessage}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                                disabled={!isConnected}
                                className="flex-1 border-blue-200 dark:border-blue-800 focus:border-blue-400 dark:focus:border-blue-500"
                              />
                              <Button
                                onClick={handleSendMessage}
                                disabled={!newMessage.trim() || !isConnected}
                                size="sm"
                                className="bg-blue-500 hover:bg-blue-600 text-white"
                              >
                                <LuSend className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}