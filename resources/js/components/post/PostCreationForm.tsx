import { v4 } from 'uuid';
import useTranslation from '@/hooks/use-translation';
import { useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '../ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ChevronRight as Right } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Field, FieldItem } from '../form';

type PostCreationFormProps = {
    userName: string;
};

export default ({ userName }: PostCreationFormProps) => {
    const { __ } = useTranslation();
    const fieldNames = {
        name: userName,
        title: '',
        body: '',
        slug: '',
    };
    const { data, post, setData, reset } = useForm(fieldNames);
    const uuid = v4();

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        post(route('post.create'), {
            onSuccess: (data) => {
                reset('title');
                reset('body');
                reset('slug');
            }
        });
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const name = event.target.name as keyof typeof data;
        const value = event.target.value;
        setData(name, value);
    }

    return <form onSubmit={handleSubmit}>
        <Card>
            <CardHeader>
                <CardTitle>{__('components.post.PostCreationForm.title')}</CardTitle>
            </CardHeader>
            <CardContent>

                <Field>
                    <FieldItem>
                        <Label
                            htmlFor={`${uuid}-title`}
                        >{__('components.post.PostCreationForm.titleLabel')}</Label>
                        <Input
                            type="text"
                            name="title"
                            id={`${uuid}-title`}
                            placeholder={
                                __('components.post.PostCreationForm.titlePlaceholder', { max: 200 })
                            }
                            value={data.title}
                            onChange={handleChange}
                        ></Input>
                    </FieldItem>
                    <FieldItem>
                        <Label htmlFor={`${uuid}-body`}>{__('components.post.PostCreationForm.label')}</Label>
                        <Textarea
                            name="body"
                            id={`${uuid}-body`}
                            value={data.body}
                            placeholder={
                                __('components.post.PostCreationForm.placeholder', { max: 200 })
                            }
                            onChange={handleChange}
                        ></Textarea>
                    </FieldItem>
                    <FieldItem>
                        <Label
                            htmlFor={`${uuid}-slug`}
                        >{__('components.post.PostCreationForm.slugLabel')}</Label>
                        <Input
                            type="text"
                            name="slug"
                            id={`${uuid}-slug`}
                            value={data.slug}
                            onChange={handleChange}
                        ></Input>
                    </FieldItem>
                </Field>
            </CardContent>
            <CardFooter>
                <Button type="submit">
                    <Right />
                    {__('components.post.PostCreationForm.submit')}
                </Button>
            </CardFooter>
        </Card>
    </form>
};
