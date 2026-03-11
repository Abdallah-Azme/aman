import { Badge } from "@/components/ui/badge";
const CustomBadage = ({text}: {text: string}) => {
  return (
    <Badge className='bg-linear-to-b from-primary to-secondary text-white text-sm px-4 py-2 rounded-xl border-none'>{text}</Badge>
  )
}

export default CustomBadage