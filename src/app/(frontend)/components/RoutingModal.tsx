"use client";

import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import React from "react";

export default function RoutingModal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();

  const handleOpenChange = () => {
    router.back();
  };

  return (
    <div className="dialog-overlay">
      <Dialog
        defaultOpen={true}
        open={true}
        onOpenChange={handleOpenChange}
        modal
      >
        <DialogOverlay>
          <DialogContent
            className={`overflow-y-scroll max-h-svh sm:max-w-4xl ${className}`}
            // h-[90%]
          >
            {children}
          </DialogContent>
        </DialogOverlay>
      </Dialog>
    </div>
  );
}
