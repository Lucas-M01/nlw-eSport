interface Props {
    label: string;
    value: string;
    colorValue?: string
}

export function DuoInfo({ label, value, colorValue = 'text-white'}: Props) {
  return (
    <div>
          <h3 className="mb-0 overflow-hidden text-zinc-200">
            {label}
          </h3>

          <p className={`${colorValue} mb-2 cursor-auto font-semibold overflow-hidden text-ellipsis select-all whitespace-nowrap`}>
            {value}
          </p>
    </div>
  );
}