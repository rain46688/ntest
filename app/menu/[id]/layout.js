export default function MenuLayout(props) {
    return (
        <form>
            <h2>Menu : {props.params.id}</h2>
            {props.children}
        </form>
    );
  }