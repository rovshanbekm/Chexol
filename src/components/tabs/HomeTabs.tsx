import sessionStore from "../../utils/sessionStore";

export const HomeTabs = () => {
    const settingsTab = sessionStore((state) => state.settingsTab);
    const setSettingsTab = sessionStore((state) => state.setSettingsTab);
    return (
        <div className="flex gap-2.5 overflow-x-auto" style={{scrollbarWidth: "none"}}>
            <button
                onClick={() => setSettingsTab('all')}
                className={`rounded-[20px] py-[13.5px] px-[15px] border h-12 font-medium text-sm ${settingsTab === 'all' ? "bg-mainColor text-white" : "bg-white text-secondColor"
                    }`}
            >
                Hamma
            </button>
            <button
                onClick={() => setSettingsTab('phonecase')}
                className={`h-12 rounded-[20px] py-[13.5px] px-[15px] border font-medium text-sm ${settingsTab === 'phonecase' ? "bg-mainColor text-white" : "bg-white text-secondColor"
                    }`}
            >
                G’ilof
            </button>
            <button
                onClick={() => setSettingsTab('earphones')}
                className={`h-12 rounded-[20px] py-[13.5px] px-[15px] border font-medium text-sm ${settingsTab === 'earphones' ? "bg-mainColor text-white" : "bg-white text-secondColor"
                    }`}
            >
                Quloqchin
            </button>
            <button
                onClick={() => setSettingsTab('phonecharger')}
                className={`h-12 rounded-[20px] py-[13.5px] px-[15px] border font-medium text-sm ${settingsTab === 'phonecharger' ? "bg-mainColor text-white" : "bg-white text-secondColor"
                    }`}
            >
                Quvvatlagich
            </button>
        </div>
    )
}

export default HomeTabs