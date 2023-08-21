import Image, {ImageProps} from "next/image";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";



const ButtonIcon = styled(AddIcon)`
  position: absolute;
  height: 45px;
  width: 45px;
  opacity: 1;
  color: #1a1a1a;
  transition: all 0.2s linear;

  &:hover {
    opacity: 1;
  }
`

interface Props {
    name: string,
}


const MealGroupImage = ({name}: Props) => {

    return (
        <>
            <Image src={`/${name}.png`} alt={`${name} image`} fill quality={1}/>
            <ButtonIcon/>
        </>
    )
}

export default MealGroupImage;