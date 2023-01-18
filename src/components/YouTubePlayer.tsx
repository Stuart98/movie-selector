type Props = {
    title: string;
    videoKey: string;
};

export default function YouTubePlayer({ title, videoKey }: Props) {
    const styles = {
        margin: '10px auto',
    };

    return (
        <iframe width="560" height="315" style={styles} src={`https://www.youtube.com/embed/${videoKey}`} title={title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
    )
}

