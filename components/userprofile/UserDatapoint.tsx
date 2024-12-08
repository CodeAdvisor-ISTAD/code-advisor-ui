export const DataBlockPink = ({ number, text }: { number: string; text: string }) => (
    <div className="flex flex-col items-center relative">
        <div className="font-bold text-base">{number}</div>
        <div className="h-3 w-3 bg-pink-500 rounded-sm mb-7"></div>
        <div className="font-bold text-sm font-khFont absolute top-12 text-center whitespace-nowrap">
            {text}
        </div>
    </div>
);

export const DataBlockBlue = ({ number, text }: { number: string; text: string }) => (
    <div className="flex flex-col items-center relative">
        <div className="font-bold text-base">{number}</div>
        <div className="h-3 w-3 bg-blue-500 rounded-sm mb-7"></div>
        <div className="font-bold text-sm font-khFont absolute top-12 text-center whitespace-nowrap">
            {text}
        </div>
    </div>
);

export const DataBlockGreen = ({ number, text }: { number: string; text: string }) => (
    <div className="flex flex-col items-center relative">
        <div className="font-bold text-base">{number}</div>
        <div className="h-3 w-3 bg-green-600 rounded-sm mb-7"></div>
        <div className="font-bold text-sm font-khFont absolute top-12 text-center whitespace-nowrap">
            {text}
        </div>
    </div>
);

export const DataBlockYellow = ({
    number,
    text,
}: {
    number: string;
    text: string;
}) => (
    <div className="flex flex-col items-center relative">
        <div className="font-bold text-base">{number}</div>
        <div className="h-3 w-3 bg-orange-400 rounded-sm mb-7"></div>
        <div className="font-bold text-sm font-khFont absolute top-12 text-center whitespace-nowrap">
            {text}
        </div>
    </div>
);

export const DataBlockPurple = ({
    number,
    text,
}: {
    number: string;
    text: string;
}) => (
    <div className="flex flex-col items-center relative">
        <div className="font-bold text-base">{number}</div>
        <div className="h-3 w-3 bg-purple-600 rounded-sm mb-7"></div>
        <div className="font-bold text-sm font-khFont absolute top-12 text-center whitespace-nowrap">
            {text}
        </div>
    </div>
);