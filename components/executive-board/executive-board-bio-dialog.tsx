'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ExecutiveBoardAvatar } from './executive-board-avatar';
import type { ExecutiveBoardMember } from '@/lib/data/executive-board';

interface ExecutiveBoardBioDialogProps {
  member: ExecutiveBoardMember | null;
  onClose: () => void;
}

export function ExecutiveBoardBioDialog({ member, onClose }: ExecutiveBoardBioDialogProps) {
  return (
    <Dialog open={member !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[calc(100%-2rem)] bg-background p-6 text-foreground ring-primary/20 transition-colors duration-700 animation-duration-100 sm:max-w-md">
        {member && (
          <>
            <ExecutiveBoardAvatar member={member} className="mx-auto h-24 w-24 shrink-0" sizes="96px" />
            <DialogTitle
              className={`text-center text-primary transition-colors duration-700 ${member.name === null ? 'italic' : ''}`}
            >
              {member.name ?? 'Vacant'}
            </DialogTitle>
            <p className="text-center text-sm text-foreground/70 transition-colors duration-700">{member.role}</p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 transition-colors duration-700">{member.bio}</p>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
