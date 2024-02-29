import asst_class_component from '../../components/asset/asst_class_component';
import asst_type_component from '../../components/asset/asst_type_component';

export default function MenuPage(props) {
    let ComponentPage;
    if (props.params.id === '1') {
        ComponentPage = asst_type_component;
    } else if (props.params.id === '2') {
        ComponentPage = asst_class_component;
    } else {
        // 예외 처리
        ComponentPage = () => <div>Not Found</div>;
    }

    return (
        <div>
            <ComponentPage />
        </div>
    );
}