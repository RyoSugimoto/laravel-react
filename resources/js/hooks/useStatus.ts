import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export default (status: string) => {
    if (status) {
        const { toast } = useToast();
        useEffect(() => {
            toast({
                description: status,
            });
        }, [status]);
    }
};
