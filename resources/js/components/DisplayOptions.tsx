import { useState, useRef } from 'react';
import useTranslation from "@/hooks/useTranslation";
import { Eye } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import LanguageSwitch from '@/components/LanguageSwitch';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverAnchor
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

export default () => {
    const { __ } = useTranslation();
    const [open, setOpen] = useState<boolean>(false);

    function handleOpenChange(open: boolean) {
        setOpen(open);
    }

    function handleClose() {
        setOpen(false);
    }

    return <Popover
        open={open}
        defaultOpen={open}
        onOpenChange={handleOpenChange}
    >
        <PopoverTrigger asChild>
            <Button
                type="button"
                size="sm"
            >
                <Eye />
                {__('displayOptions')}
            </Button>
        </PopoverTrigger>
        <PopoverContent>
            <div className="grid gap-2 z-10">
                <div>
                    <ModeToggle />
                </div>
                <div>
                    <LanguageSwitch />
                </div>
                <div>
                    <Button
                        type="button"
                        onClick={handleClose}
                    >{__('complete')}</Button>
                </div>
            </div>
        </PopoverContent>
    </Popover>
};
