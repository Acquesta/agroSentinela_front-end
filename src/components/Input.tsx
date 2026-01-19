

export default function Input({ label, type, placeholder } : {label :string, type: string, placeholder: string}) {
    return (
        <div className="flex flex-col items-start gap-2">
            <label htmlFor="" className="font-light text-lg">{label}</label>
            <input type={type} placeholder={placeholder} className="bg-slate-200 w-full py-3 px-2 rounded-xl border border-gray-500" />
        </div>
    )
}