import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/types";
import { summarySchema, SummaryValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import GenerateSummaryButton from "./GenerateSummaryButton";

export default function SummaryForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<SummaryValues>({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      summary: resumeData.summary || "",
    },
    mode: 'onChange', // Validate on every change
  });

  const onSubmit = (values: SummaryValues) => {
    setResumeData(prevData => ({
      ...prevData,
      ...values
    }));
  };

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Professional summary</h2>
        <p className="text-sm text-muted-foreground">
          Write a short introduction for your resume or let the AI generate one
          from your entered data.
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3"
        >
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Professional summary</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="A brief, engaging text about yourself"
                    onChange={(e) => {
                      field.onChange(e);
                      form.handleSubmit(onSubmit)();
                    }}
                  />
                </FormControl>
                <FormMessage />
                <GenerateSummaryButton
                  resumeData={resumeData}
                  onSummaryGenerated={(summary) => {
                    form.setValue("summary", summary);
                    form.handleSubmit(onSubmit)();
                  }}
                />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}