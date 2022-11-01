import React, {FC, memo} from 'react';
import {Figure} from "../../models/figure/Figure";

interface ILostFiguresProp {
  title: string;
  figures: Figure[]
}


const LostFigures: FC<ILostFiguresProp> = ({title, figures}) => {


  return (
    <div className='lost'>
      <h3>{title}</h3>
      {figures.map(figure =>
        <div key={figure.id}>
          {figure.name} {figure.logo && <img width={20} height={20} src={figure.logo}/>}
        </div>
      )}
    </div>
  );
};

export default LostFigures;
// export default memo(LostFigures);
