// src/components/ControlPanel.jsx

import React from 'react';
import { Button } from '@/components/ui/button';

const ControlPanel = ({
  isAdmin,
  isAssistant,
  onDistributeRoles,
  onLockRoom,
  onUnlockRoom,
  onKickPlayer,
  onAssignAssistant,
  onSendRoleCards,
  isRoomLocked,
}) => {
  if (!isAdmin && !isAssistant) return null;

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl shadow space-y-3">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white">لوحة التحكم</h3>

      {isAdmin && (
        <>
          <Button
            className="w-full"
            onClick={onDistributeRoles}
            variant="default"
          >
            توزيع الأدوار
          </Button>
          <Button
            className="w-full"
            onClick={onSendRoleCards}
            variant="secondary"
          >
            إرسال البطاقات
          </Button>
          <Button
            className="w-full"
            onClick={onAssignAssistant}
            variant="outline"
          >
            تعيين مساعد
          </Button>
          <Button
            className="w-full"
            onClick={onKickPlayer}
            variant="destructive"
          >
            طرد لاعب
          </Button>
          {isRoomLocked ? (
            <Button
              className="w-full"
              onClick={onUnlockRoom}
              variant="ghost"
            >
              فتح الغرفة
            </Button>
          ) : (
            <Button
              className="w-full"
              onClick={onLockRoom}
              variant="ghost"
            >
              قفل الغرفة
            </Button>
          )}
        </>
      )}

      {isAssistant && !isAdmin && (
        <Button
          className="w-full"
          onClick={onSendRoleCards}
          variant="default"
        >
          إرسال البطاقات
        </Button>
      )}
    </div>
  );
};

export default ControlPanel;
