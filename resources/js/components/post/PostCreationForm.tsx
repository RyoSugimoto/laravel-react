import { v4 } from "uuid";
import useTranslation from "@/hooks/useTranslation";
import { useForm } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChevronRight as Right } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';


type PostCreationFormProps = {
    userName: string;
};

export default ({ userName }: PostCreationFormProps) => {
    const { __ } = useTranslation();
    const fieldNames = {
        name: userName,
        body: '',
    };
    const { data, put, setData, reset } = useForm(fieldNames);
    const uuid = v4();

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        put('/posts', {
            onSuccess: () => {
                reset('body');
            }
        });
    }

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const value = event.target.value;
        setData('body', value);
    }

    return <form onSubmit={handleSubmit}>
        <Card>
            <CardHeader>
                <CardTitle>{__('post.PostCreationForm.title')}</CardTitle>
            </CardHeader>
            <CardContent>
                <Label htmlFor={`${uuid}-body`}>{__('post.PostCreationForm.label')}</Label>
                <Textarea
                    name="body"
                    id={`${uuid}-body`}
                    value={data.body}
                    placeholder={
                        __('post.PostCreationForm.placeholder', { max: 200 })
                    }
                    onChange={handleChange}
                ></Textarea>
            </CardContent>
            <CardFooter>
                <Button type="submit">
                    <Right />
                    {__('post.PostCreationForm.submit')}
                </Button>
            </CardFooter>
        </Card>
    </form>
};
