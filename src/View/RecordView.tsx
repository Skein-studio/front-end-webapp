import styled from 'styled-components';
import { OuterBox, Text, Button} from '../Util/BaseStyles';

export default function RecordView(){
    return (
    <OuterBox>
        <Text>Record or upload a sound</Text>
        <Button>🎶</Button>
    </OuterBox>
    )
}