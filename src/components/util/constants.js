let movieGenreList = [
    {
        "id": 28,
        "name": "Action",
        "img": "https://image.tmdb.org/t/p/w500/tnAuB8q5vv7Ax9UAEje5Xi4BXik.jpg"
    },
    {
        "id": 12,
        "name": "Adventure",
        "img": "https://image.tmdb.org/t/p/w500/lPsD10PP4rgUGiGR4CCXA6iY0QQ.jpg"
    },
    {
        "id": 16,
        "name": "Animation",
        "img": "https://image.tmdb.org/t/p/w500/6KErczPBROQty7QoIsaa6wJYXZi.jpg"
    },
    {
        "id": 35,
        "name": "Comedy",
        "img": "https://image.tmdb.org/t/p/w500/3iCiTqsmJz1mO85AHzTiHNkRmb6.jpg"
    },
    {
        "id": 80,
        "name": "Crime",
        "img": "https://image.tmdb.org/t/p/w500/zeD4PabP6099gpE0STWJrJrCBCs.jpg"
    },
    {
        "id": 99,
        "name": "Documentary",
        "img": "https://image.tmdb.org/t/p/w500/t3BkZXZe6mXz971OsvVh9wHaC53.jpg"
    },
    {
        "id": 18,
        "name": "Drama",
        "img": "https://image.tmdb.org/t/p/w500/kBKKXVbVwIP81u8Bnhguux48Sdn.jpg"
    },
    {
        "id": 10751,
        "name": "Family",
        "img": "https://image.tmdb.org/t/p/w500/jlJ8nDhMhCYJuzOw3f52CP1W8MW.jpg"
    },
    {
        "id": 14,
        "name": "Fantasy",
        "img": "https://image.tmdb.org/t/p/w500/1UCOF11QCw8kcqvce8LKOO6pimh.jpg"
    },
    {
        "id": 36,
        "name": "History",
        "img": "https://image.tmdb.org/t/p/w500/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg"
    },
    {
        "id": 27,
        "name": "Horror",
        "img": "https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg"
    },
    {
        "id": 10402,
        "name": "Music",
        "img": "https://image.tmdb.org/t/p/w500/mINJaa34MtknCYl5AjtNJzWj8cD.jpg"
    },
    {
        "id": 9648,
        "name": "Mystery",
        "img": "https://image.tmdb.org/t/p/w500/sCoG0ibohbPrnyomtzegSuBL40L.jpg"
    },
    {
        "id": 10749,
        "name": "Romance",
        "img": "https://image.tmdb.org/t/p/w500/htTS07IvYv3rv57ftzNEprefwSq.jpg"
    },
    {
        "id": 878,
        "name": "Science Fiction",
        "img": "https://image.tmdb.org/t/p/w500/bmemsraCG1kIthY74NjDnnLRT2Q.jpg"
    },
    {
        "id": 10770,
        "name": "TV Movie",
        "img": "https://image.tmdb.org/t/p/w500/kPzcvxBwt7kEISB9O4jJEuBn72t.jpg"
    },
    {
        "id": 53,
        "name": "Thriller",
        "img": "https://image.tmdb.org/t/p/w500/fFRq98cW9lTo6di2o4lK1qUAWaN.jpg"
    },
    {
        "id": 10752,
        "name": "War",
        "img": "https://image.tmdb.org/t/p/w500/fTuxNlgEm04PPFkr1xfK94Jn8BW.jpg"
    },
    {
        "id": 37,
        "name": "Western",
        "img": "https://image.tmdb.org/t/p/w500/yN8jrNA9TeyeBr80SgFvBpEIFor.jpg"
    }
];

const tvGenreList = [
    {
        "id": 10759,
        "name": "Action & Adventure",
        "img": "https://image.tmdb.org/t/p/w500/obLBdhLxheKg8Li1qO11r2SwmYO.jpg"
    },
    {
        "id": 16,
        "name": "Animation",
        "img": "https://image.tmdb.org/t/p/w500/2IWouZK4gkgHhJa3oyYuSWfSqbG.jpg"
    },
    {
        "id": 35,
        "name": "Comedy",
        "img": "https://image.tmdb.org/t/p/w500/ooBGRQBdbGzBxAVfExiO8r7kloA.jpg"
    },
    {
        "id": 80,
        "name": "Crime",
        "img": "https://image.tmdb.org/t/p/w500/7TCwgX7oQKxcWYEhSPRmaHe6ULN.jpg"
    },
    {
        "id": 99,
        "name": "Documentary",
        "img": "https://image.tmdb.org/t/p/w500/5o07ps0QZ0bNoRYxTn9cPdRWlUu.jpg"
    },
    {
        "id": 18,
        "name": "Drama",
        "img": "https://image.tmdb.org/t/p/w500/clnyhPqj1SNgpAdeSS6a6fwE6Bo.jpg"
    },
    {
        "id": 10751,
        "name": "Family",
        "img": "https://image.tmdb.org/t/p/w500/qO0aveHUNqKciN9hO5EvBQGtZ3d.jpg"
    },
    {
        "id": 10762,
        "name": "Kids",
        "img": "https://image.tmdb.org/t/p/w500/oIvVYBDGMs7FQcalyzRB42dVXu7.jpg"
    },
    {
        "id": 9648,
        "name": "Mystery",
        "img": "https://image.tmdb.org/t/p/w500/lkvhReTBZ2Ksl0Dl5Oplsf6UYkF.jpg"
    },
    {
        "id": 10763,
        "name": "News",
        "img": "https://image.tmdb.org/t/p/w500/bpfKrFG9N97gIfnBK4gtAC2yop7.jpg"
    },
    {
        "id": 10764,
        "name": "Reality",
        "img": "https://image.tmdb.org/t/p/w500/7kvTVGyTlbmRJ8nX3Y7uXc3IBmP.jpg"
    },
    {
        "id": 10765,
        "name": "Sci-Fi & Fantasy",
        "img": "https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg"
    },
    {
        "id": 10766,
        "name": "Soap",
        "img": "https://image.tmdb.org/t/p/w500/Ag7VUdnrRz5Qpq3Yn3E5OCvFnu0.jpg"
    },
    {
        "id": 10767,
        "name": "Talk",
        "img": "https://image.tmdb.org/t/p/w500/umg9aSj00UhOPozp6pZuUAnZubY.jpg"
    },
    {
        "id": 10768,
        "name": "War & Politics",
        "img": "https://image.tmdb.org/t/p/w500/uTSLeQTeHevt4fplegmQ6bOnE0Z.jpg"
    },
    {
        "id": 37,
        "name": "Western",
        "img": "https://image.tmdb.org/t/p/w500/43nVQqVsrshaOx9GfJq6JstsfCX.jpg"
    }
];

const allGenreList = [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    },
    {
        "id": 10759,
        "name": "Action & Adventure"
    },
    {
        "id": 10762,
        "name": "Kids"
    },
    {
        "id": 10763,
        "name": "News"
    },
    {
        "id": 10764,
        "name": "Reality"
    },
    {
        "id": 10765,
        "name": "Sci-Fi & Fantasy"
    },
    {
        "id": 10766,
        "name": "Soap"
    },
    {
        "id": 10767,
        "name": "Talk"
    },
    {
        "id": 10768,
        "name": "War & Politics"
    }
]

module.exports = {
    movieGenreList,
    tvGenreList,
    allGenreList
}