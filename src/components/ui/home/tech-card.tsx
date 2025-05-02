import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function TechCard({title, stack}: {title: string, stack: string[]}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {stack.map((entry, idx) => (
            <p key={idx}>{entry}</p>
        ))}
      </CardContent>
    </Card>
  );
}
