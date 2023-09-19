import RenderLevel from "./RenderLevel";

const RecursiveRender = ({graph, levels, axiosInstance}: any) => {
    if (levels.length === 0) {
        return null;
    }

    const [currentLevel, ...remainingLevels] = levels;

    return (
        <div>
            <RenderLevel level={currentLevel.level} lockedPrompts={currentLevel.lockedPrompts}
                         axiosInstance={axiosInstance}/>
            <RecursiveRender graph={graph} levels={remainingLevels} axiosInstance={axiosInstance}/>
        </div>
    );
};


export default RecursiveRender