const DemoPictures = ({picture1, picture2}) => {

    return (
        <div className="line-block flex_in_studio max-width">
            <img className="picture_container" src={picture1} alt={"Стрельба из лука"}/>
            <img className="picture_container" src={picture2} alt={"Стрельба из лука"}/>
        </div>
    );

}

export default DemoPictures;