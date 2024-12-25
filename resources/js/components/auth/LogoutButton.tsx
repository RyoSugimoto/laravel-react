import { useForm } from "@inertiajs/react";
import useTranslation from "@/hooks/useTranslation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default () => {
    const { __ } = useTranslation();
    const { post } = useForm({});

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        post('logout');
    }

    return <form onSubmit={handleSubmit}>
        <Button
            type="submit"
            variant="link"
        >
            <LogOut />
            {__('logoutButton')}
        </Button>
    </form>;
};
