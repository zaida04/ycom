import { Input } from "../ui/input";
import { Label } from "../ui/label";

export interface ModalInputProps extends React.ComponentProps<typeof Input> {
    label: string;
}

export default function ModalInput(
    { label, ...rest }: ModalInputProps
) {
    return <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={rest.id} className="text-right">
            {label}
        </Label>
        <Input className="col-span-3" {...rest} />
    </div>
}