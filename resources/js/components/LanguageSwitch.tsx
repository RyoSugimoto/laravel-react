import { v4 } from 'uuid';
import { router } from '@inertiajs/react';
import useTranslation from "@/hooks/useTranslation";
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';

export default () => {
    const { __, locale } = useTranslation();
    const languageOptions = [
        { value: 'ja' },
        { value: 'en' },
    ];
    const uuid = v4();

    function handleChange(value: string) {
        router.post('switch-language', {
            language: value,
        });
    }

    return <div>
        <Label
            htmlFor={`${uuid}-language`}
        >{__('language')}</Label>
        <Select
            name="language"
            onValueChange={handleChange}
            defaultValue={locale}
        >
            <SelectTrigger
                id={`${uuid}-language`}
                className="max-w-64"
            >
                <SelectValue placeholder={__('language')} />
            </SelectTrigger>
            <SelectContent>
                {languageOptions.map((option, index) => <SelectItem
                    key={index}
                    value={option.value}
                >{__(`languageLabel.${option.value}`)}</SelectItem>)}
            </SelectContent>
        </Select>
    </div>
};
