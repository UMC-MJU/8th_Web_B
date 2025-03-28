interface ListProps{
    tech : string;
}

const List = ({tech} : ListProps) => {
    console.log(tech)
    return (
        <li>
            {tech}
        </li>
    )
};

export default List
