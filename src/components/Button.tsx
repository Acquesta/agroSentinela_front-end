export default function Button({ name }: { name: string }) {
    return (
        <button type="submit" className="bg-[#247240] w-full py-3 text-white font-bold rounded-xl cursor-pointer">
            {name}
        </button>
    )
}