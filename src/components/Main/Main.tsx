import {MyProgram} from "@component/components/MyProgram/MyProgram";
import {useAppSelector} from "@component/hooks/hooks";
import styles from './Main.module.css'


export const Main = () => {

    const activeMenu = useAppSelector(state => state.main.activeMenu)

    function contentSelect() {
        switch (activeMenu) {
            case 'my-program':
                return (<MyProgram/>)
            default:
                return (
                    <div>пока ничего</div>
                )
        }
    }

    return (
        <div className={styles.container}>
            {contentSelect()}
        </div>
    )
}