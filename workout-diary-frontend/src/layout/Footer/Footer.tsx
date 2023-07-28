import {FooterProps} from "./Footer.props";
import cn from "classnames";
import styles from './Footer.module.css';
import {format} from 'date-fns';

export const Footer = ({className, ...props}: FooterProps) => {

    return (
       <footer {...props} className={cn(className, styles.footer)}>
           <div>
               TrainingDiary &copy; 2023 - {format(new Date(), 'yyyy')} Все права защищены
           </div>
           <a href="#" target="_blank">Пользовательское соглашение</a>
           <a href="#" target="_blank">Политика конфиденциальности</a>
       </footer>
    );
};