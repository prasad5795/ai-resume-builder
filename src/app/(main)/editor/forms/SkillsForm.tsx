import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/types";
import { skillsSchema, SkillsValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function SkillsForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<SkillsValues>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: resumeData.skills || [],
    },
    mode: 'onChange', // Validate on every change
  });

  const onSubmit = (values: SkillsValues) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setResumeData((prevData: any) => ({
      ...prevData,
      skills: values.skills
        ?.filter((skill) => skill !== undefined)
        .map((skill) => skill.trim())
        .filter((skill) => skill !== "") || [],
    }));
  };

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Skills</h2>
        <p className="text-sm text-muted-foreground">What are you good at?</p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3"
        >
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Skills</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="e.g. React.js, Node.js, graphic design, ..."
                    value={field.value?.join(", ") || ""}
                    onChange={(e) => {
                      const skills = e.target.value.split(",");
                      field.onChange(skills);
                      form.handleSubmit(onSubmit)();
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Separate each skill with a comma.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}