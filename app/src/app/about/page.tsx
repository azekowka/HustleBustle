import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>About HustleBustle</CardTitle>
          <CardDescription>Learn more about our application</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Turn chaos into clarity—track time effortlessly with HustleBustle
          </p>
          <p className="mt-4 text-muted-foreground">Features include:</p>
          <ul className="list-disc list-inside mt-2 text-muted-foreground">
            <li></li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

