'use client';

import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { ExecutiveBoardAvatar } from './executive-board-avatar';
import type { ExecutiveBoardMember } from '@/lib/data/executive-board';

interface ExecutiveBoardBioDialogProps {
  member: ExecutiveBoardMember | null;
  onClose: () => void;
}

export function ExecutiveBoardBioDialog({ member, onClose }: ExecutiveBoardBioDialogProps) {
  return (
    <Dialog open={member !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[calc(100%-2rem)] bg-background p-6 text-foreground ring-primary/20 transition-colors duration-700 sm:max-w-lg">
        {member && (
          <>
            <div className="flex items-center gap-4">
              <ExecutiveBoardAvatar
                member={member}
                className="h-28 w-28 shrink-0 rounded-full sm:h-36 sm:w-36"
                sizes="(min-width: 640px) 144px, 112px"
              />
              <div className="min-w-0">
                <DialogTitle
                  className={`text-lg text-primary transition-colors duration-700 ${member.name === null ? 'italic' : ''}`}
                >
                  {member.name ?? 'Vacant'}
                </DialogTitle>
                <p className="text-sm text-foreground/70 transition-colors duration-700">{member.role}</p>
              </div>
            </div>
            <DialogDescription className="mt-4 text-sm leading-relaxed text-foreground/85 transition-colors duration-700">
              {member.bio}
            </DialogDescription>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
