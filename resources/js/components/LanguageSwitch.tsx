import { useForm, router } from '@inertiajs/react';
import useTranslation from "@/hooks/useTranslation";

export default () => {
    const { __, locale } = useTranslation();
    const languageOptions = [
        { value: 'ja' },
        { value: 'en' },
    ];
    function handleChange(event) {
        const value = event.target.value;
        router.post('change-language', {
            language: value,
        });
    }
    return <div>
        {__('language')}: <select
            name="language"
            id=""
            onChange={handleChange}
            defaultValue={locale}
        >
            {languageOptions.map(option => <option
                value={option.value}
            >{__(`languageLabel.${option.value}`)}</option>)}
        </select>
    </div>
};
