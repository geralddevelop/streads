export const DetailItem = ({
  title,
  content
}: {
  title: string
  content?: string
}) => {
  return (
    <div className="flex items-center justify-between gap-2 py-2">
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 bg-green-800 rounded-full"></div>
        <p className="text-lg">{title} </p>
      </div>

      <div className="h-4 w-4 bg-black rounded-full"></div>
    </div>
  )
}
