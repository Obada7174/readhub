'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import { LuBell, LuX } from 'react-icons/lu';
import Cookies from 'js-cookie';
import { io, Socket } from 'socket.io-client';

// تعريف الأنواع
interface Notification {
  id: string | number;
  message?: string;
  title?: string;
  description?: string;
  isRead: boolean;
  createdAt?: string;
  timestamp?: string;
}

interface ApiResponse {
  notifications: Notification[];
  unreadCount: number;
  hasMore: boolean;
}

interface AuthData {
  token: string | null;
  userId: string | number | null;
}

interface UserData {
  id: string | number;
  [key: string]: any;
}

const NotificationBell: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  const LIMIT_PER_PAGE = 5;

  // دالة جلب التوكن و userId من الكوكيز
  const getAuthData = (): AuthData => {
    try {
      const token = Cookies.get('access_token');
      const userCookie = Cookies.get('user');

      if (!token || !userCookie) {
        console.warn('لا يوجد توكن أو بيانات مستخدم في الكوكيز');
        return { token: null, userId: null };
      }

      const userData: UserData = JSON.parse(userCookie);
      return {
        token,
        userId: userData.id,
      };
    } catch (error) {
      console.error('خطأ في قراءة بيانات المصادقة:', error);
      return { token: null, userId: null };
    }
  };

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // إعداد WebSocket
  useEffect(() => {
    const { token, userId } = getAuthData();
    if (token && userId) {
      initializeSocket(token);
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  const initializeSocket = (token: string): void => {
    try {
      socketRef.current = io('http://localhost:5000', {
        auth: { token },
        transports: ['websocket'],
      });

      socketRef.current.on('connect', () => {
        setIsConnected(true);
        console.log('تم الاتصال بخادم WebSocket');
      });

      socketRef.current.on('disconnect', () => {
        setIsConnected(false);
        console.log('تم قطع الاتصال عن خادم WebSocket');
      });

      socketRef.current.on('new_notification', (notification: Notification) => {
        console.log("notification")
        console.log(notification)
        setNotifications((prev) => [notification, ...prev]);
        setUnreadCount((prev) => prev + 1);

        const bell = document.querySelector('.notification-bell');
        if (bell) {
          bell.classList.add('animate-bounce');
          setTimeout(() => bell.classList.remove('animate-bounce'), 1000);
        }
      });

      socketRef.current.on('unread_count', (count: number) => {
        setUnreadCount(count);
      });

      socketRef.current.on('connect_error', (error: any) => {
        console.error('خطأ في الاتصال:', error.message);
        setIsConnected(false);
      });
    } catch (error) {
      console.error('خطأ في إعداد WebSocket:', error);
    }
  };

  // جلب الإشعارات من API
  const fetchNotifications = async (page: number = 1, reset: boolean = false): Promise<void> => {
    if (isLoading) return;

    const { token, userId } = getAuthData();
    if (!token || !userId) {
      console.warn('لا يوجد توكن أو معرف مستخدم صالح');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/notifications?userId=${userId}&page=${page}&limit=${LIMIT_PER_PAGE}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      const newNotifications = data.notifications || [];

      if (reset || page === 1) {
        setNotifications(newNotifications);
      } else {
        setNotifications((prev) => [...prev, ...newNotifications]);
      }

      setUnreadCount(data.unreadCount || 0);
      setHasMore(data.hasMore !== false && newNotifications.length === LIMIT_PER_PAGE);
      setCurrentPage(page);
    } catch (error) {
      console.error('خطأ في جلب الإشعارات:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // تحميل المزيد
  const loadMore = (): void => {
    if (!isLoading && hasMore) {
      fetchNotifications(currentPage + 1);
    }
  };

  // فتح/إغلاق القائمة
  const toggleDropdown = (): void => {
    setIsOpen((prev) => {
      const newState = !prev;
      if (newState && notifications.length === 0) {
        fetchNotifications(1, true);
      }
      return newState;
    });
  };

  // تحديد الإشعار كمقروء
  const markAsRead = async (notificationId: string | number): Promise<void> => {
    const { token } = getAuthData();
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:5000/notifications/${notificationId}/read`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setNotifications((prev) =>
          prev.map((notif) =>
            notif.id === notificationId ? { ...notif, isRead: true } : notif
          )
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('خطأ في تحديد الإشعار كمقروء:', error);
    }
  };

  // تنسيق الوقت
  const formatTime = (timestamp?: string): string => {
    if (!timestamp) return '';
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);

      if (diffInMinutes < 1) return 'الآن';
      if (diffInMinutes < 60) return `منذ ${diffInMinutes} دقيقة`;
      if (diffInMinutes < 1440) return `منذ ${Math.floor(diffInMinutes / 60)} ساعة`;
      return date.toLocaleDateString('ar');
    } catch {
      return '';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* زر الجرس */}
      <button
        onClick={toggleDropdown}
        className="notification-bell relative p-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full transition-colors duration-200"
        type="button"
      >
        <LuBell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
        <div
          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${
            isConnected ? 'bg-green-500' : 'bg-gray-400'
          }`}
        ></div>
      </button>

      {/* القائمة */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900">الإشعارات</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              type="button"
            >
              <LuX className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-y-auto max-h-80">
            {isLoading && notifications.length === 0 ? (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="mr-2 text-gray-600">جاري التحميل...</span>
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <LuBell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>لا توجد إشعارات</p>
              </div>
            ) : (
              <div>
                {notifications.map((notification, index) => (
                  <div
                    key={notification.id || index}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                      !notification.isRead ? 'bg-blue-50 border-r-4 border-r-blue-500' : ''
                    }`}
                    onClick={() => !notification.isRead && markAsRead(notification.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p
                          className={`text-sm ${
                            !notification.isRead
                              ? 'font-semibold text-gray-900'
                              : 'text-gray-700'
                          }`}
                        >
                          {notification.message || notification.title || 'إشعار جديد'}
                        </p>
                        {notification.description && (
                          <p className="text-xs text-gray-500 mt-1">
                            {notification.description}
                          </p>
                        )}
                      </div>
                      <span className="text-xs text-gray-400 mr-2 whitespace-nowrap">
                        {formatTime(notification.createdAt || notification.timestamp)}
                      </span>
                    </div>
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    )}
                  </div>
                ))}

                {hasMore && (
                  <div className="p-4 text-center">
                    <button
                      onClick={loadMore}
                      disabled={isLoading}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium disabled:text-gray-400 disabled:cursor-not-allowed"
                      type="button"
                    >
                      {isLoading ? 'جاري التحميل...' : 'تحميل المزيد'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-3 bg-gray-50 border-t border-gray-200">
              <button
                className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                عرض جميع الإشعارات
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
