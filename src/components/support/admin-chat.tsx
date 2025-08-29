'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import io, { Socket } from 'socket.io-client';
import Cookies from 'js-cookie';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/Input';
import {
    LuSend,
    LuUser,
    LuBot,
    LuRefreshCw,
    LuMessageSquare,
    LuClock,
    LuWifi,
    LuWifiOff
} from 'react-icons/lu';
import Button from '../ui/Button';
import { Avatar, Badge } from '@mui/material';
import { useTranslations } from 'next-intl';

interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    isOnline?: boolean;
    unreadCount?: number;
    lastMessageTime?: string;
}

interface Message {
    id: string;
    message: string;
    from: 'user' | 'admin' | 'support';
    createdAt: string;
    user: {
        id: string;
        first_name?: string;
        last_name?: string;
    };
}

export function AdminSupportDashboard() {
    // States
    const t = useTranslations('Support');
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [authError, setAuthError] = useState('');
    const [showAuthPanel, setShowAuthPanel] = useState(false);

    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const selectedUserRef = useRef<User | null>(null);

    useEffect(() => {
        selectedUserRef.current = selectedUser;
    }, [selectedUser]);

    useEffect(() => {
        if (!socket) return;

        socket.on('new_message', (message: Message) => {
            loadUsers();

            if (selectedUserRef.current && selectedUserRef.current.id === message.user.id) {
                setMessages(prev => [...prev, message]);
            }
        });

        return () => {
            socket.off('new_message');
        };
    }, [socket]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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

            // تحميل المستخدمين
            loadUsers();
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
        });

        newSocket.on('new_message', (message: Message) => {
            console.log('رسالة جديدة:', message);
            // تحديث قائمة المستخدمين
            loadUsers();

            // إذا كانت الرسالة للمستخدم المحدد حالياً
            if (selectedUser && selectedUser.id === message.user.id) {
                setMessages(prev => [...prev, message]);
            }
        });

        newSocket.on('error', (err) => {
            console.error('خطأ:', err);
            setAuthError(`خطأ: ${err.message}`);
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

    const loadUsers = async () => {
        // if (!isConnected) return;

        setIsLoadingUsers(true);
        try {
            const token = Cookies.get('access_token');
            const response = await fetch('http://localhost:5000/support/users', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('فشل تحميل المستخدمين');
            }

            const usersData = await response.json();
            setUsers(usersData);
        } catch (error) {
            console.error('خطأ في تحميل المستخدمين:', error);
            setAuthError(error instanceof Error ? error.message : 'خطأ غير معروف');
        } finally {
            setIsLoadingUsers(false);
        }
    };

    const selectUser = async (user: User) => {
        setSelectedUser(user);
        setIsLoadingMessages(true);

        try {
            const userMessages = await fetchMessages(user.id);
            setMessages(userMessages);
        } catch (error) {
            console.error('خطأ في تحميل الرسائل:', error);
        } finally {
            setIsLoadingMessages(false);
        }
    };

    const fetchMessages = async (userId: string): Promise<Message[]> => {
        try {
            const token = Cookies.get('access_token');
            const response = await fetch(`http://localhost:5000/support/messages?userId=${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('فشل تحميل الرسائل');
            }

            return await response.json();
        } catch (error) {
            console.error('خطأ في تحميل الرسائل:', error);
            return [];
        }
    };

    const handleSendMessage = () => {
        if (!newMessage.trim() || !selectedUser || !socket || !isConnected) return;

        const messageToSend = {
            userId: selectedUser.id,
            message: newMessage.trim()
        };

        socket.emit('support_reply', messageToSend);

        const newMsg: Message = {
            id: Date.now().toString(),
            message: newMessage.trim(),
            from: 'admin',
            createdAt: new Date().toISOString(),
            user: { id: selectedUser.id }
        };

        setMessages(prev => [...prev, newMsg]);
        setNewMessage('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
    };

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString('ar', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    //   const formatDate = (dateString: string) => {
    //     return new Date(dateString).toLocaleDateString('ar');
    //   };

    if (showAuthPanel) {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      <Card className="w-full max-w-md bg-white dark:bg-gray-800">
        <CardContent className="p-6 text-center">
          <div className="mb-4">
            <LuMessageSquare className="h-16 w-16 mx-auto text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
              {t('Support Dashboard')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {authError || t('Connecting to support')}
            </p>
          </div>

          {authError && (
            <Button
              onClick={handleRetryConnection}
              disabled={isConnecting}
              className="w-full"
            >
              {isConnecting ? t('Connecting') : t('Retry')}
            </Button>
          )}

          {!authError && isConnecting && (
            <div className="flex items-center justify-center">
              <LuRefreshCw className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

return (
  <div className="h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    {/* Header */}
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {t('Support Dashboard')}
        </h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {isConnected ? (
              <LuWifi className="h-5 w-5 text-green-500" />
            ) : (
              <LuWifiOff className="h-5 w-5 text-red-500" />
            )}
            <span
              className={`text-sm ${
                isConnected
                  ? 'text-green-600'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {isConnected ? t('Connected') : t('Disconnected')}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={loadUsers}
            disabled={isLoadingUsers}
            className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
          >
            {isLoadingUsers ? (
              <LuRefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <LuRefreshCw className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>

    <div className="flex h-[calc(100vh-80px)]">
      {/* Users List */}
      <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100">{t('Users')}</h2>
          {/* <p className="text-sm text-gray-500 dark:text-gray-400">{tCount('user', users.length)}</p> */}
        </div>

        <div className="flex-1 overflow-y-auto">
          {isLoadingUsers ? (
            <div className="flex items-center justify-center py-8">
              <LuRefreshCw className="h-6 w-6 animate-spin text-gray-400" />
            </div>
          ) : users.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400">
              <LuUser className="h-12 w-12 mb-2" />
              <p>{t('No users connected')}</p>
            </div>
          ) : (
            <div className="space-y-1 p-2">
              {users.map((user) => (
                <motion.div
                  key={user.id}
                  whileHover={{ backgroundColor: 'rgba(249, 250, 251, 1) dark:rgba(30, 41, 59, 1)' }}
                  className={`p-3 rounded-lg cursor-pointer border-2 transition-colors ${
                    selectedUser?.id === user.id
                      ? 'border-blue-200 bg-blue-50 dark:border-blue-500 dark:bg-blue-900/20'
                      : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => selectUser(user)}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      {getInitials(user.first_name, user.last_name)}
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                          {user.first_name} {user.last_name}
                        </h3>
                        <div className="flex items-center space-x-1">
                          <div
                            className={`w-2 h-2 rounded-full ${user.isOnline ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-400'}`}
                          />
                          {user.unreadCount && user.unreadCount > 0 && (
                            <Badge className="text-xs bg-blue-500 text-white">
                              {user.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                      {user.lastMessageTime && (
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 flex items-center">
                          <LuClock className="h-3 w-3 ml-1" />
                          {formatTime(user.lastMessageTime)}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {!selectedUser ? (
          <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="text-center">
              <LuMessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                {t('Select a conversation')}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {t('Select a user from the list to start chatting')}
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  {getInitials(selectedUser.first_name, selectedUser.last_name)}
                </Avatar>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    {selectedUser.first_name} {selectedUser.last_name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedUser.email}
                  </p>
                </div>
                <div
                  className={`w-2 h-2 rounded-full ml-auto ${selectedUser.isOnline ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-400'}`}
                />
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
              {isLoadingMessages ? (
                <div className="flex items-center justify-center h-full">
                  <LuRefreshCw className="h-8 w-8 animate-spin text-gray-400" />
                </div>
              ) : messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                  <div className="text-center">
                    <LuMessageSquare className="h-12 w-12 mx-auto mb-2 text-gray-300 dark:text-gray-700" />
                    <p>{t('No previous messages')}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 max-w-4xl mx-auto">
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${message.from === 'admin' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`flex items-start space-x-2 max-w-[80%] ${
                          message.from === 'admin' ? 'flex-row-reverse space-x-reverse' : ''
                        }`}
                      >
                        <div
                          className={`flex items-center justify-center rounded-full shrink-0 w-8 h-8 ${
                            message.from === 'admin'
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {message.from === 'admin' ? (
                            <LuBot className="w-4 h-4" />
                          ) : (
                            <LuUser className="w-4 h-4" />
                          )}
                        </div>

                        <div
                          className={`rounded-2xl px-4 py-2 ${
                            message.from === 'admin'
                              ? 'bg-blue-500 text-white'
                              : 'bg-white text-gray-900 border border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700'
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.from === 'admin'
                                ? 'text-blue-100'
                                : 'text-gray-500 dark:text-gray-400'
                            }`}
                          >
                            {formatTime(message.createdAt)}
                            {message.from === 'admin' && <span className="mr-2">{t('(you)')}</span>}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex space-x-2 max-w-4xl mx-auto">
                <Input
                  placeholder={t('Type your reply here')}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={!isConnected}
                  className="flex-1 bg-white dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || !isConnected}
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4"
                >
                  <LuSend className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  </div>
);
}