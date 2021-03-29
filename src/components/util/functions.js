import genreList from './constants';

const movieDataConverter = data => {
    console.log(data)
    for(let i=0; i<data.length; i++) {
        let year='', month='', day='';
        try {
            if(data[i].first_air_date === '' || data[i].release_date === '') {
                throw 'no release date';
            }
            if(data[i].media_type === 'movie' || data[i].first_air_date === undefined) {
                data[i].media_type = 'movie';
                year = data[i].release_date.slice(0,4);
                month = data[i].release_date.slice(5,7); 
                day = data[i].release_date.slice(8); 
            }
            else if(data[i].media_type === 'tv' || data[i].release_date === undefined) {
                data[i].media_type = 'tv';
                year = data[i].first_air_date.slice(0,4);
                month = data[i].first_air_date.slice(5,7); 
                day = data[i].first_air_date.slice(8);
                data[i].title = data[i].name;
            }
            switch(month) {
                case '01': month = 'Jan'
                    break;
                case '02': month = 'Feb'
                    break;
                case '03': month = 'Mar'
                    break;
                case '04': month = 'Apr'
                    break;
                case '05': month = 'May'
                    break;
                case '06': month = 'Jun'
                    break;
                case '07': month = 'Jul'
                    break;
                case '08': month = 'Aug'
                    break;
                case '09': month = 'Sep'
                    break;
                case '10': month = 'Oct'
                    break;
                case '11': month = 'Nov'
                    break;
                case '12': month = 'Dec'
                    break;
                default:
                    break;
            }
            if(day.charAt(0) === '0') {
                day = day.slice(1);
            }
            data[i].release_date = month + ' ' + day + ', ' + year;
        }
        catch {
            data[i].release_date = 'No release date'
        }

        let vote = data[i].vote_average;
        let voteColor = '';
        if(vote <= 3.5) {
            voteColor = 'red';
        } else if(vote <= 7) {
            voteColor = 'yellow';
        } else { 
            voteColor = 'green' 
        }
        if(Number.isInteger(vote) && vote !== 10) {
            vote = vote + '.0';
            data[i].vote_average = vote;
        }
        data[i].vote_color = voteColor;

        for(let g=0; g<data[i].genre_ids.length; g++) {
            if(g<3) {
                for(let a=0; a<genreList.allGenreList.length; a++) {
                    if(data[i].genre_ids[g] === genreList.allGenreList[a].id) {
                        data[i].genre_ids[g] = {
                            name: genreList.allGenreList[a].name,
                            color: Math.floor(Math.random() * 5)
                        }
                    }              
                }          
            } 
            else {
                data[i].genre_ids.splice(g,1);
            }
        }
    }
    return data;
}
    


export default movieDataConverter;