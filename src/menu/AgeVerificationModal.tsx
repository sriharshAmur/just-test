import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck } from "lucide-react";

interface AgeVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (isAbove18: boolean) => void;
}

export default function AgeVerificationModal({
  isOpen,
  onClose,
  onVerify,
}: AgeVerificationModalProps) {
  const handleVerification = (isAbove18: boolean) => {
    onVerify(isAbove18);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent
        className="select-none sm:max-w-[500px]"
        data-qa="age-verification-modal"
      >
        <DialogHeader>
          <DialogTitle
            className="flex items-center justify-center text-2xl font-bold"
            data-qa="age-verification-title"
          >
            <ShieldCheck className="mr-2 h-6 w-6 text-primary" />
            Age Verification
          </DialogTitle>
          <DialogDescription
            className="text-center text-base"
            data-qa="age-verification-description"
          >
            We need to verify your age before you can view this content.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            <div className="space-y-4">
              <p
                className="text-center text-lg font-medium"
                data-qa="age-verification-question"
              >
                Are you 18 years of age or older?
              </p>
              <p
                className="text-center text-sm text-muted-foreground"
                data-qa="age-verification-explanation"
              >
                By clicking "Yes", you confirm that you are of legal age to view
                and purchase age-restricted items in your country or region.
              </p>
            </div>
          </div>
        </ScrollArea>
        <Separator className="my-4" />
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleVerification(false)}
            data-qa="age-verification-no-button"
          >
            No, I'm under 18
          </Button>
          <Button
            onClick={() => handleVerification(true)}
            className="bg-primary hover:bg-primary/90"
            data-qa="age-verification-yes-button"
          >
            Yes, I'm 18 or older
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
