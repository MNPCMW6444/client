import {Grid} from "@mui/material";
import Prompt from "../../common/Prompt";


const RenderLevel = ({level, lockedPrompts, axiosInstance}: any) => {
    return (
        <Grid
            item
            container
            justifyContent="center"
            columnSpacing={3}
        >
            {level.map((item: any, index: any) => (
                <Grid key={index} item>
                    <Prompt level={item} setOpenPrompt={item}/>
                </Grid>
            ))}
        </Grid>
    );
};

export default RenderLevel