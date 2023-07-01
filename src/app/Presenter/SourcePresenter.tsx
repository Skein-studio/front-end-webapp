import { InnerBox } from "../Util/BaseStyles";
import { NodeBox } from "../Util/NodeStyles";
import { useEffect, useState } from "react";

enum BoxSize {
    Small = "small",
    BigMobile = "bigMobile",
    BigPC = "bigPC",
  }

export default function SourcePresenter(){
    const [boxSize, setBoxSize] = useState<BoxSize>(BoxSize.Small);

    function renderBox(){
        switch(boxSize){
            case BoxSize.Small:
                break;
            case BoxSize.BigMobile:
                break;
            case BoxSize.BigPC:
                break;
        }
    }



    return (
        {}
    );

}
