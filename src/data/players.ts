export interface Player {
  id: string
  name: string
  level: 1 | 2 | 3 | 4 | 5
  clubs: string[]
}

export const players: Player[] = [

  // ─────────────────────────────────────────────
  // LEVEL 1 — Global icons, first club gives it away
  // ─────────────────────────────────────────────
  {
    id: 'ronaldo',
    name: 'Cristiano Ronaldo',
    level: 1,
    clubs: ['Sporting CP', 'Manchester United', 'Real Madrid', 'Juventus', 'Al Nassr'],
  },
  {
    id: 'messi',
    name: 'Lionel Messi',
    level: 1,
    clubs: ['Barcelona', 'Paris Saint-Germain', 'Inter Miami'],
  },
  {
    id: 'henry',
    name: 'Thierry Henry',
    level: 1,
    clubs: ['Monaco', 'Juventus', 'Arsenal', 'Barcelona', 'New York Red Bulls'],
  },
  {
    id: 'beckham',
    name: 'David Beckham',
    level: 1,
    clubs: ['Manchester United', 'Real Madrid', 'LA Galaxy', 'AC Milan', 'Paris Saint-Germain'],
  },
  {
    id: 'zidane',
    name: 'Zinedine Zidane',
    level: 1,
    clubs: ['Cannes', 'Bordeaux', 'Juventus', 'Real Madrid'],
  },
  {
    id: 'ronaldinho',
    name: 'Ronaldinho',
    level: 1,
    clubs: ['Grêmio', 'Paris Saint-Germain', 'Barcelona', 'AC Milan', 'Flamengo'],
  },
  {
    id: 'rooney',
    name: 'Wayne Rooney',
    level: 1,
    clubs: ['Everton', 'Manchester United', 'Everton', 'DC United', 'Derby County'],
  },
  {
    id: 'ibrahimovic',
    name: 'Zlatan Ibrahimovic',
    level: 1,
    clubs: ['Malmö FF', 'Ajax', 'Juventus', 'Inter Milan', 'Barcelona', 'AC Milan', 'Paris Saint-Germain', 'Manchester United', 'LA Galaxy'],
  },
  {
    id: 'drogba',
    name: 'Didier Drogba',
    level: 1,
    clubs: ['Le Mans', 'Guingamp', 'Marseille', 'Chelsea', 'Shanghai Shenhua', 'Galatasaray', 'Montreal Impact'],
  },
  {
    id: 'kaka',
    name: 'Kaká',
    level: 1,
    clubs: ['São Paulo', 'AC Milan', 'Real Madrid', 'AC Milan', 'Orlando City'],
  },
  {
    id: 'neymar',
    name: 'Neymar',
    level: 1,
    clubs: ['Santos', 'Barcelona', 'Paris Saint-Germain', 'Al Hilal'],
  },
  {
    id: 'suarez',
    name: 'Luis Suárez',
    level: 1,
    clubs: ['Nacional', 'Groningen', 'Ajax', 'Liverpool', 'Barcelona', 'Atlético Madrid', 'Nacional'],
  },
  {
    id: 'shevchenko',
    name: 'Andriy Shevchenko',
    level: 1,
    clubs: ['Dynamo Kyiv', 'AC Milan', 'Chelsea', 'Dynamo Kyiv'],
  },
  {
    id: 'cantona',
    name: 'Eric Cantona',
    level: 1,
    clubs: ['Auxerre', 'Marseille', 'Bordeaux', 'Montpellier', 'Leeds United', 'Manchester United'],
  },
  {
    id: 'scholes',
    name: 'Paul Scholes',
    level: 1,
    clubs: ['Manchester United'],
  },
  {
    id: 'totti',
    name: 'Francesco Totti',
    level: 1,
    clubs: ['Roma'],
  },
  {
    id: 'giggs',
    name: 'Ryan Giggs',
    level: 1,
    clubs: ['Manchester United'],
  },
  {
    id: 'gerrard',
    name: 'Steven Gerrard',
    level: 1,
    clubs: ['Liverpool', 'LA Galaxy'],
  },
  {
    id: 'lampard',
    name: 'Frank Lampard',
    level: 1,
    clubs: ['West Ham United', 'Swansea City', 'Chelsea', 'Manchester City', 'New York City FC'],
  },
  {
    id: 'ferdinand',
    name: 'Rio Ferdinand',
    level: 1,
    clubs: ['West Ham United', 'Leeds United', 'Manchester United', 'Queens Park Rangers'],
  },

  // ─────────────────────────────────────────────
  // LEVEL 2 — Famous, but career path less automatic
  // ─────────────────────────────────────────────
  {
    id: 'roberto-carlos',
    name: 'Roberto Carlos',
    level: 2,
    clubs: ['União São João', 'Palmeiras', 'Inter Milan', 'Real Madrid', 'Fenerbahçe', 'Corinthians'],
  },
  {
    id: 'vieira',
    name: 'Patrick Vieira',
    level: 2,
    clubs: ['Cannes', 'AC Milan', 'Arsenal', 'Juventus', 'Inter Milan', 'Manchester City', 'New York City FC'],
  },
  {
    id: 'romario',
    name: 'Romário',
    level: 2,
    clubs: ['Vasco da Gama', 'PSV Eindhoven', 'Barcelona', 'Flamengo', 'Valencia', 'Fluminense', 'Vasco da Gama'],
  },
  {
    id: 'rivaldo',
    name: 'Rivaldo',
    level: 2,
    clubs: ['Santa Cruz', 'Mogi Mirim', 'Corinthians', 'Palmeiras', 'Deportivo La Coruña', 'Barcelona', 'AC Milan', 'Cruzeiro', 'Olympiacos'],
  },
  {
    id: 'ballack',
    name: 'Michael Ballack',
    level: 2,
    clubs: ['Chemnitzer FC', 'Kaiserslautern', 'Bayer Leverkusen', 'Bayern Munich', 'Chelsea', 'Bayer Leverkusen'],
  },
  {
    id: 'pirlo',
    name: 'Andrea Pirlo',
    level: 2,
    clubs: ['Brescia', 'Inter Milan', 'AC Milan', 'Juventus', 'New York City FC'],
  },
  {
    id: 'maldini',
    name: 'Paolo Maldini',
    level: 2,
    clubs: ['AC Milan'],
  },
  {
    id: 'puyol',
    name: 'Carles Puyol',
    level: 2,
    clubs: ['Barcelona'],
  },
  {
    id: 'xavi',
    name: 'Xavi',
    level: 2,
    clubs: ['Barcelona', 'Al Sadd'],
  },
  {
    id: 'iniesta',
    name: 'Andrés Iniesta',
    level: 2,
    clubs: ['Barcelona', 'Vissel Kobe', 'Emirates Club'],
  },
  {
    id: 'crouch',
    name: 'Peter Crouch',
    level: 2,
    clubs: ['Tottenham Hotspur', 'Aston Villa', 'Southampton', 'Liverpool', 'Portsmouth', 'Tottenham Hotspur', 'Stoke City', 'Burnley'],
  },
  {
    id: 'pizarro',
    name: 'Claudio Pizarro',
    level: 2,
    clubs: ['Alianza Lima', 'Werder Bremen', 'Bayern Munich', 'Chelsea', 'Werder Bremen', 'Bayern Munich', 'Werder Bremen', 'Cologne'],
  },
  {
    id: 'nedved',
    name: 'Pavel Nedvěd',
    level: 2,
    clubs: ['Dukla Prague', 'Sparta Prague', 'Lazio', 'Juventus'],
  },
  {
    id: 'figo',
    name: 'Luís Figo',
    level: 2,
    clubs: ['Sporting CP', 'Barcelona', 'Real Madrid', 'Inter Milan'],
  },
  {
    id: 'seedorf',
    name: 'Clarence Seedorf',
    level: 2,
    clubs: ['Ajax', 'Sampdoria', 'Real Madrid', 'Inter Milan', 'AC Milan', 'Botafogo'],
  },
  {
    id: 'keane-roy',
    name: 'Roy Keane',
    level: 2,
    clubs: ['Cobh Ramblers', 'Nottingham Forest', 'Manchester United', 'Celtic'],
  },
  {
    id: 'owen',
    name: 'Michael Owen',
    level: 2,
    clubs: ['Liverpool', 'Real Madrid', 'Newcastle United', 'Manchester United', 'Stoke City'],
  },
  {
    id: 'cole-andy',
    name: 'Andrew Cole',
    level: 2,
    clubs: ['Arsenal', 'Bristol City', 'Newcastle United', 'Manchester United', 'Blackburn Rovers', 'Fulham', 'Manchester City', 'Portsmouth', 'Birmingham City', 'Sunderland'],
  },
  {
    id: 'van-nistelrooy',
    name: 'Ruud van Nistelrooy',
    level: 2,
    clubs: ['Den Bosch', 'Heerenveen', 'PSV Eindhoven', 'Manchester United', 'Real Madrid', 'Hamburg', 'Málaga'],
  },
  {
    id: 'inzaghi',
    name: 'Filippo Inzaghi',
    level: 2,
    clubs: ['Piacenza', 'Leffe', 'Verona', 'Parma', 'Atalanta', 'Juventus', 'AC Milan'],
  },
  {
    id: 'cafu',
    name: 'Cafu',
    level: 2,
    clubs: ['São Paulo', 'Zaragoza', 'Palmeiras', 'Roma', 'AC Milan'],
  },
  {
    id: 'riquelme',
    name: 'Juan Román Riquelme',
    level: 2,
    clubs: ['Boca Juniors', 'Barcelona', 'Villarreal', 'Boca Juniors', 'Argentinos Juniors', 'Boca Juniors'],
  },
  {
    id: 'vieri',
    name: 'Christian Vieri',
    level: 2,
    clubs: ['Juventus', 'Atalanta', 'Piacenza', 'Venezia', 'Atletico Madrid', 'Lazio', 'Inter Milan', 'Chelsea', 'AC Milan'],
  },
  {
    id: 'bergkamp',
    name: 'Dennis Bergkamp',
    level: 2,
    clubs: ['Ajax', 'Inter Milan', 'Arsenal'],
  },
  {
    id: 'van-der-sar',
    name: 'Edwin van der Sar',
    level: 2,
    clubs: ['Ajax', 'Juventus', 'Fulham', 'Manchester United'],
  },

  // ─────────────────────────────────────────────
  // LEVEL 3 — Well-known, career path needs thinking
  // ─────────────────────────────────────────────
  {
    id: 'tevez',
    name: 'Carlos Tevez',
    level: 3,
    clubs: ['Boca Juniors', 'Corinthians', 'West Ham United', 'Manchester United', 'Manchester City', 'Juventus', 'Shanghai Shenhua', 'Boca Juniors'],
  },
  {
    id: 'anelka',
    name: 'Nicolas Anelka',
    level: 3,
    clubs: ['Paris Saint-Germain', 'Arsenal', 'Real Madrid', 'Liverpool', 'Manchester City', 'Fenerbahçe', 'Bolton Wanderers', 'Chelsea', 'West Bromwich Albion', 'Mumbai City'],
  },
  {
    id: 'petit',
    name: 'Emmanuel Petit',
    level: 3,
    clubs: ['Monaco', 'Arsenal', 'Barcelona', 'Chelsea', 'Southampton'],
  },
  {
    id: 'desailly',
    name: 'Marcel Desailly',
    level: 3,
    clubs: ['Nantes', 'Marseille', 'AC Milan', 'Chelsea', 'Al-Gharafa', 'Botafogo'],
  },
  {
    id: 'leboeuf',
    name: 'Frank Leboeuf',
    level: 3,
    clubs: ['Laval', 'Strasbourg', 'Chelsea', 'Marseille', 'RC Strasbourg'],
  },
  {
    id: 'wiltord',
    name: 'Sylvain Wiltord',
    level: 3,
    clubs: ['Rennes', 'Girondins de Bordeaux', 'Arsenal', 'Lyon', 'Rennes'],
  },
  {
    id: 'pires',
    name: 'Robert Pires',
    level: 3,
    clubs: ['Reims', 'Metz', 'Marseille', 'Arsenal', 'Villarreal', 'Aston Villa'],
  },
  {
    id: 'ljungberg',
    name: 'Freddie Ljungberg',
    level: 3,
    clubs: ['Halmstads BK', 'Arsenal', 'West Ham United', 'Celtic', 'Fulham', 'Chicago Fire', 'Shimizu S-Pulse'],
  },
  {
    id: 'cole-joe',
    name: 'Joe Cole',
    level: 3,
    clubs: ['West Ham United', 'Chelsea', 'Liverpool', 'Lille', 'West Ham United', 'Aston Villa', 'Coventry City'],
  },
  {
    id: 'heskey',
    name: 'Emile Heskey',
    level: 3,
    clubs: ['Leicester City', 'Liverpool', 'Birmingham City', 'Wigan Athletic', 'Aston Villa', 'Newcastle Jets', 'Bolton Wanderers'],
  },
  {
    id: 'solskjaer',
    name: 'Ole Gunnar Solskjær',
    level: 3,
    clubs: ['Clausenengen', 'Molde', 'Manchester United', 'Molde'],
  },
  {
    id: 'yorke',
    name: 'Dwight Yorke',
    level: 3,
    clubs: ['Aston Villa', 'Manchester United', 'Blackburn Rovers', 'Birmingham City', 'Sunderland', 'Sydney FC', 'Sunderland'],
  },
  {
    id: 'sheringham',
    name: 'Teddy Sheringham',
    level: 3,
    clubs: ['Millwall', 'Aldershot', 'Nottingham Forest', 'Tottenham Hotspur', 'Manchester United', 'Tottenham Hotspur', 'Portsmouth', 'West Ham United', 'Colchester United'],
  },
  {
    id: 'fowler',
    name: 'Robbie Fowler',
    level: 3,
    clubs: ['Liverpool', 'Leeds United', 'Manchester City', 'Liverpool', 'Cardiff City', 'Blackburn Rovers', 'North Queensland Fury'],
  },
  {
    id: 'duff',
    name: 'Damien Duff',
    level: 3,
    clubs: ['Blackburn Rovers', 'Chelsea', 'Newcastle United', 'Fulham', 'Fulham', 'Melbourne City', 'Shamrock Rovers'],
  },
  {
    id: 'hasselbaink',
    name: 'Jimmy Floyd Hasselbaink',
    level: 3,
    clubs: ['Campomaiorense', 'AZ', 'Leeds United', 'Atletico Madrid', 'Chelsea', 'Middlesbrough', 'Charlton Athletic', 'Cardiff City'],
  },
  {
    id: 'ginola',
    name: 'David Ginola',
    level: 3,
    clubs: ['Toulon', 'Racing Club de Paris', 'Brest', 'Paris Saint-Germain', 'Newcastle United', 'Tottenham Hotspur', 'Aston Villa', 'Everton'],
  },
  {
    id: 'poborsky',
    name: 'Karel Poborský',
    level: 3,
    clubs: ['Dynamo České Budějovice', 'Viktoria Žižkov', 'Slavia Prague', 'Manchester United', 'Benfica', 'Lazio', 'Sparta Prague'],
  },
  {
    id: 'salgado',
    name: 'Michel Salgado',
    level: 3,
    clubs: ['Celta Vigo', 'Real Madrid', 'Blackburn Rovers', 'West Ham United'],
  },
  {
    id: 'kanu',
    name: 'Nwankwo Kanu',
    level: 3,
    clubs: ['Federation Works', 'Iwuanyanwu Nationale', 'Ajax', 'Inter Milan', 'Arsenal', 'West Bromwich Albion', 'Portsmouth'],
  },
  {
    id: 'mendieta',
    name: 'Gaizka Mendieta',
    level: 3,
    clubs: ['Valencia', 'Lazio', 'Barcelona', 'Middlesbrough', 'Middlesbrough'],
  },
  {
    id: 'saviola',
    name: 'Javier Saviola',
    level: 3,
    clubs: ['River Plate', 'Barcelona', 'Monaco', 'Sevilla', 'Real Madrid', 'Benfica', 'Málaga', 'Hellas Verona'],
  },
  {
    id: 'stam',
    name: 'Jaap Stam',
    level: 3,
    clubs: ['FC Zwolle', 'Cambuur', 'Willem II', 'PSV Eindhoven', 'Manchester United', 'Lazio', 'AC Milan', 'Ajax'],
  },
  {
    id: 'kewell',
    name: 'Harry Kewell',
    level: 3,
    clubs: ['Leeds United', 'Liverpool', 'Galatasaray', 'Urawa Red Diamonds', 'Melbourne Victory', 'Oldham Athletic'],
  },

  // ─────────────────────────────────────────────
  // LEVEL 4 — Solid pros, tricky career paths
  // ─────────────────────────────────────────────
  {
    id: 'robbie-keane',
    name: 'Robbie Keane',
    level: 4,
    clubs: ['Wolverhampton Wanderers', 'Coventry City', 'Inter Milan', 'Leeds United', 'Tottenham Hotspur', 'Liverpool', 'Celtic', 'LA Galaxy', 'Aston Villa', 'West Ham United'],
  },
  {
    id: 'mido',
    name: 'Mido',
    level: 4,
    clubs: ['Zamalek', 'Gent', 'Ajax', 'Celta Vigo', 'Marseille', 'Roma', 'Tottenham Hotspur', 'Middlesbrough', 'Wigan Athletic', 'Ipswich Town'],
  },
  {
    id: 'elano',
    name: 'Elano',
    level: 4,
    clubs: ['Santos', 'Shakhtar Donetsk', 'Manchester City', 'Galatasaray', 'Santos', 'Grêmio', 'Botafogo'],
  },
  {
    id: 'cambiasso',
    name: 'Esteban Cambiasso',
    level: 4,
    clubs: ['River Plate', 'Independiente', 'Real Madrid', 'Zaragoza', 'Inter Milan', 'Leicester City', 'Olympiacos'],
  },
  {
    id: 'emerson',
    name: 'Emerson',
    level: 4,
    clubs: ['Grêmio', 'Roma', 'Juventus', 'Real Madrid', 'Lyons'],
  },
  {
    id: 'laursen',
    name: 'Martin Laursen',
    level: 4,
    clubs: ['Silkeborg IF', 'Hellas Verona', 'AC Milan', 'Aston Villa'],
  },
  {
    id: 'konchesky',
    name: 'Paul Konchesky',
    level: 4,
    clubs: ['Charlton Athletic', 'Tottenham Hotspur', 'West Ham United', 'Fulham', 'Liverpool', 'Nottingham Forest', 'Leicester City', 'Queens Park Rangers', 'Ipswich Town'],
  },
  {
    id: 'bellion',
    name: 'David Bellion',
    level: 4,
    clubs: ['Cannes', 'Sunderland', 'Manchester United', 'West Ham United', 'Nice', 'Bordeaux', 'Panathinaikos', 'Zulte Waregem'],
  },
  {
    id: 'chadli',
    name: 'Nacer Chadli',
    level: 4,
    clubs: ['STVV', 'Twente', 'Tottenham Hotspur', 'West Bromwich Albion', 'Monaco', 'Anderlecht', 'STVV'],
  },
  {
    id: 'diuf',
    name: 'El Hadji Diouf',
    level: 4,
    clubs: ['Sochaux', 'Rennes', 'Lens', 'Liverpool', 'Bolton Wanderers', 'Sunderland', 'Blackburn Rovers', 'Rangers', 'Leeds United', 'Doncaster Rovers'],
  },
  {
    id: 'viduka',
    name: 'Mark Viduka',
    level: 4,
    clubs: ['Melbourne Knights', 'Croatia Zagreb', 'Celtic', 'Leeds United', 'Middlesbrough', 'Newcastle United'],
  },
  {
    id: 'aston',
    name: 'Nolberto Solano',
    level: 4,
    clubs: ['Sporting Cristal', 'Boca Juniors', 'Newcastle United', 'Aston Villa', 'Newcastle United', 'West Ham United', 'Hull City', 'Leicester City'],
  },
  {
    id: 'diego-forlan',
    name: 'Diego Forlán',
    level: 4,
    clubs: ['Independiente', 'Manchester United', 'Villarreal', 'Atletico Madrid', 'Inter Milan', 'Internazionale', 'Internacional', 'Cerezo Osaka', 'Peñarol'],
  },
  {
    id: 'litmanen',
    name: 'Jari Litmanen',
    level: 4,
    clubs: ['HJK Helsinki', 'MyPa', 'HJK Helsinki', 'Ajax', 'Barcelona', 'Liverpool', 'Ajax', 'Lahti', 'Malmo', 'HJK Helsinki'],
  },
  {
    id: 'gallas',
    name: 'William Gallas',
    level: 4,
    clubs: ['Caen', 'Marseille', 'Chelsea', 'Arsenal', 'Tottenham Hotspur', 'Perth Glory'],
  },
  {
    id: 'hleb',
    name: 'Aleksandr Hleb',
    level: 4,
    clubs: ['BATE Borisov', 'VfB Stuttgart', 'Arsenal', 'Barcelona', 'Stuttgart', 'Birmimgham City', 'Wolfsburg', 'BATE Borisov'],
  },
  {
    id: 'aimar',
    name: 'Pablo Aimar',
    level: 4,
    clubs: ['River Plate', 'Valencia', 'Zaragoza', 'Benfica', 'River Plate'],
  },
  {
    id: 'van-bommel',
    name: 'Mark van Bommel',
    level: 4,
    clubs: ['Fortuna Sittard', 'PSV Eindhoven', 'Barcelona', 'Bayern Munich', 'AC Milan', 'PSV Eindhoven'],
  },
  {
    id: 'deschamps',
    name: 'Didier Deschamps',
    level: 4,
    clubs: ['Nantes', 'Concarneau', 'Nantes', 'Marseille', 'Juventus', 'Chelsea', 'Valencia', 'Marseille'],
  },
  {
    id: 'saha',
    name: 'Louis Saha',
    level: 4,
    clubs: ['Metz', 'Newcastle United', 'Fulham', 'Manchester United', 'Everton', 'Tottenham Hotspur', 'Sunderland', 'Lazio'],
  },
  {
    id: 'boateng-kevin',
    name: 'Kevin-Prince Boateng',
    level: 4,
    clubs: ['Hertha Berlin', 'Tottenham Hotspur', 'Portsmouth', 'Borussia Dortmund', 'AC Milan', 'Schalke 04', 'Las Palmas', 'Barcelona', 'Eintracht Frankfurt', 'Sassuolo', 'AC Monza'],
  },
  {
    id: 'jeffers',
    name: 'Francis Jeffers',
    level: 4,
    clubs: ['Everton', 'Arsenal', 'Everton', 'Charlton Athletic', 'Rangers', 'Blackburn Rovers', 'Newcastle United', 'Sheffield Wednesday', 'Motherwell'],
  },

  // ─────────────────────────────────────────────
  // LEVEL 5 — True journeymen, obscure paths
  // ─────────────────────────────────────────────
  {
    id: 'marcus-bent',
    name: 'Marcus Bent',
    level: 5,
    clubs: ['Brentford', 'Crystal Palace', 'Port Vale', 'Sheffield United', 'Blackburn Rovers', 'Ipswich Town', 'Leicester City', 'Everton', 'Charlton Athletic', 'Wigan Athletic'],
  },
  {
    id: 'trevor-benjamin',
    name: 'Trevor Benjamin',
    level: 5,
    clubs: ['Cambridge United', 'Leicester City', 'Crystal Palace', 'Gillingham', 'Northampton Town', 'Coventry City', 'Watford', 'Birmingham City', 'Swindon Town', 'Peterborough United', 'Boston United'],
  },
  {
    id: 'dion-dublin',
    name: 'Dion Dublin',
    level: 5,
    clubs: ['Norwich City', 'Cambridge United', 'Manchester United', 'Coventry City', 'Aston Villa', 'Millwall', 'Leicester City', 'Celtic', 'Aston Villa'],
  },
  {
    id: 'carl-cort',
    name: 'Carl Cort',
    level: 5,
    clubs: ['Wimbledon', 'Lincoln City', 'Newcastle United', 'Wolverhampton Wanderers', 'Leicester City', 'Derby County'],
  },
  {
    id: 'stern-john',
    name: 'Stern John',
    level: 5,
    clubs: ['Columbus Crew', 'Nottingham Forest', 'Birmingham City', 'Derby County', 'Coventry City', 'Sunderland', 'Southampton', 'Burnley', 'Bristol City', 'Tranmere Rovers'],
  },
  {
    id: 'carlton-cole',
    name: 'Carlton Cole',
    level: 5,
    clubs: ['Chelsea', 'Wolverhampton Wanderers', 'Charlton Athletic', 'Aston Villa', 'West Ham United', 'Celtic', 'West Ham United', 'Al-Ahli', 'Seattle Sounders'],
  },
  {
    id: 'shefki-kuqi',
    name: 'Shefki Kuqi',
    level: 5,
    clubs: ['HJK Helsinki', 'Jokerit', 'FC Haka', 'Stockport County', 'Sheffield Wednesday', 'Ipswich Town', 'Blackburn Rovers', 'Crystal Palace', 'Fulham', 'Newcastle United', 'Swansea City'],
  },
  {
    id: 'peter-odemwingie',
    name: 'Peter Odemwingie',
    level: 5,
    clubs: ['Bendel Insurance', 'Lokomotiv Moscow', 'Lille', 'West Bromwich Albion', 'Cardiff City', 'Stoke City', 'Bristol City', 'Madura United'],
  },
  {
    id: 'ibisevic',
    name: 'Vedad Ibišević',
    level: 5,
    clubs: ['Saint Louis Unniversity', 'Paris Saint-Germain', 'AC Ajaccio', 'Dijon', '1899 Hoffenheim', 'Lokomotiv Moscow', 'Hannover 96', 'Schalke 04', 'Stuttgart', 'Hertha Berlin'],
  },
  {
    id: 'benni-mccarthy',
    name: 'Benni McCarthy',
    level: 5,
    clubs: ['Ajax', 'Celta Vigo', 'Porto', 'Blackburn Rovers', 'West Ham United'],
  },
  {
    id: 'nicky-butt',
    name: 'Nicky Butt',
    level: 5,
    clubs: ['Manchester United', 'Newcastle United', 'Birmingham City', 'South Melbourne', 'Hong Kong Rangers'],
  },
  {
    id: 'robbie-savage',
    name: 'Robbie Savage',
    level: 5,
    clubs: ['Manchester United', 'Crewe Alexandra', 'Leicester City', 'Birmingham City', 'Blackburn Rovers', 'Derby County'],
  },
  {
    id: 'craig-bellamy',
    name: 'Craig Bellamy',
    level: 5,
    clubs: ['Norwich City', 'Coventry City', 'Newcastle United', 'Blackburn Rovers', 'Liverpool', 'West Ham United', 'Manchester City', 'Cardiff City', 'Liverpool', 'Cardiff City'],
  },
  {
    id: 'emile-mpenza',
    name: 'Emile Mpenza',
    level: 5,
    clubs: ['Molenbeek', 'Schalke 04', 'Hamburger SV', 'Manchester City', 'Nice'],
  },
  {
    id: 'jan-koller',
    name: 'Ján Koller',
    level: 5,
    clubs: ['Dukla Prague', 'Anderlecht', 'Borussia Dortmund', 'Monaco', 'Nuremberg', 'Lokomotiv Moscow'],
  },
  {
    id: 'hakan-sukur',
    name: 'Hakan Şükür',
    level: 5,
    clubs: ['Bursaspor', 'Galatasaray', 'Torino', 'Galatasaray', 'Inter Milan', 'Parma', 'Galatasaray', 'Blackburn Rovers', 'MLS'],
  },
  {
    id: 'emerton',
    name: 'Brett Emerton',
    level: 5,
    clubs: ['Sydney Olympic', 'Feyenoord', 'Blackburn Rovers', 'Sydney FC'],
  },
  {
    id: 'fredi-bobic',
    name: 'Fredi Bobic',
    level: 5,
    clubs: ['VfB Stuttgart', 'Borussia Dortmund', 'Bolton Wanderers', 'Hannover 96', 'Hertha Berlin'],
  },
  {
    id: 'jon-dahl-tomasson',
    name: 'Jon Dahl Tomasson',
    level: 5,
    clubs: ['Køge BK', 'Heerenveen', 'Newcastle United', 'Feyenoord', 'AC Milan', 'Villarreal', 'Stuttgart'],
  },
  {
    id: 'mateja-kezman',
    name: 'Mateja Kežman',
    level: 5,
    clubs: ['Partizan', 'OFK Beograd', 'PSV Eindhoven', 'Chelsea', 'Atletico Madrid', 'Paris Saint-Germain', 'Zenit Saint Petersburg', 'Wolfsburg'],
  },
  {
    id: 'wes-brown',
    name: 'Wes Brown',
    level: 5,
    clubs: ['Manchester United', 'Sunderland', 'Blackburn Rovers'],
  },
  {
    id: 'lassina-diabate',
    name: 'Aliou Diatta',
    level: 5,
    clubs: ['Lens', 'Racing Santander', 'Blackburn Rovers', 'Sunderland'],
  },
  {
    id: 'nuno-gomes',
    name: 'Nuno Gomes',
    level: 5,
    clubs: ['Boavista', 'Benfica', 'Fiorentina', 'Benfica', 'Sporting Braga', 'Blackburn Rovers'],
  },
  {
    id: 'igor-biscan',
    name: 'Igor Bišćan',
    level: 5,
    clubs: ['Dinamo Zagreb', 'Liverpool', 'Panathinaikos', 'Dinamo Zagreb'],
  },
  {
    id: 'eidur-gudjohnsen',
    name: 'Eidur Gudjohnsen',
    level: 5,
    clubs: ['KR Reykjavik', 'PSV Eindhoven', 'Bolton Wanderers', 'Chelsea', 'Barcelona', 'Monaco', 'Tottenham Hotspur', 'Stoke City', 'Fulham', 'Molde', 'Sogndal', 'Viking'],
  },
  {
    id: 'florent-sinama-pongolle',
    name: 'Florent Sinama Pongolle',
    level: 5,
    clubs: ['Le Havre', 'Liverpool', 'Blackburn Rovers', 'Recreativo', 'Atletico Madrid', 'Zaragoza', 'Al-Hilal', 'Sporting CP'],
  },
]
