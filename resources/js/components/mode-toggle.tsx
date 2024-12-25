import { v4 } from 'uuid';
import useTranslation from "@/hooks/useTranslation";
import { Moon, Sun, Settings } from "lucide-react"

import { useTheme } from "@/components/theme-provider";

import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';

export function ModeToggle() {
    const { setTheme, theme } = useTheme();
    const { __ } = useTranslation();
    const uuid = v4();
    const themes = [
        'light',
        'dark',
        'system',
    ] as const;

    function handleChange(value: (typeof themes)[number]) {
        setTheme(value);
    }

    return <div>
        <Label htmlFor={`${uuid}-language`}>{__('colorScheme')}</Label>
        <Select
            onValueChange={handleChange}
        >
            <SelectTrigger
                id={`${uuid}-language`}
                className="max-w-64"
            >
                <SelectValue placeholder={__(`colorSchemeTheme.${theme}`)} />
            </SelectTrigger>
            <SelectContent>
                {themes.map((theme, index) => {
                    return <SelectItem
                        key={index}
                        value={theme}
                    >
                        <span className="flex gap-2 items-center">
                            {theme === 'light' && <Sun className="w-4" />}
                            {theme === 'dark' && <Moon className="w-4" />}
                            {theme === 'system' && <Settings className="w-4" />}
                            {__(`colorSchemeTheme.${theme}`)}
                        </span>
                    </SelectItem>
                })}
            </SelectContent>
        </Select>
    </div>
}
