import DefaultLayout from "@/components/layout/Default";

export default function DrawingBoard() {
    return (
        <DefaultLayout>
            <div className="p-8">
                <h1 className="text-4xl font-bold mb-6">Drawing Board</h1>
                <div className="w-full border-2 h-[71vh] rounded-xl"></div>
            </div>
        </DefaultLayout>
    );
}