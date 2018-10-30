import React from 'react';

class Top20Container extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            topSongs: []
        };
    }

    componentDidMount() {
        fetch('https://itunes.apple.com/gb/rss/topsongs/limit=20/json')
            .then(response => response.json())
            .then(data => data.feed.entry.map(entry => ({
                id: entry["id"]["label"],
                title: entry["title"]["label"],
                artist: entry["im:artist"]["label"],
                album: entry["im:collection"]["im:name"]["label"],
                releaseDate: entry["im:releaseDate"]["attributes"]["label"],
                price: entry["im:price"]["label"],
            })))
            .then(data => this.setState({ topSongs: data }));
    }

    render() {
        const songList = this.state.topSongs.map(song => (
            <li key={song.id}>
                <div>Album: {song.album}</div>
                <div>Title: {song.title}</div>
                <div>Artist: {song.artist}</div>
                <div>Release Date: {song.releaseDate}</div>
                <div>Price: {song.price}</div>
            </li>
        ));
        return (
            <div>
                <h2>Top 20 Songs</h2>
                <ul>
                    {songList}
                </ul>
            </div>
        );
   } 
}

export default Top20Container;
