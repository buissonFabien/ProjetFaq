var words_fr = ['être', 'avoir', 'faire', 'a', 'au','aux','avec','ce','ces','dans','de','des',
    'du','elle','en','et','eux','il','je','la','le','leur','lui','ma','mais','me','même','mes',
    'moi','mon','ne','nos','notre','nous','on','ou','où','par','pas','pour','qu','que','qui',
    'sa','se','ses','son','sur','ta','te','tes','toi','ton','tu','un','une','vos','votre',
    'vous','c','d','j','l','à','m','n','s','t','y','été','étée','étées','étés','étant',
    'suis','es','est','sommes','êtes','sont','serai','seras','sera','serons','serez','seront',
    'serais','serait','serions','seriez','seraient','étais','était','étions','étiez','étaient','fus',
    'fut','fûmes','fûtes','furent','sois','soit','soyons','soyez','soient','fusse','fusses','fût','fussions',
    'fussiez','fussent','ayant','eu','eue','eues','eus','ai','as','avons','avez','ont','aurai','auras','aura',
    'aurons','aurez','auront','aurais','aurait','aurions','auriez','auraient','avais','avait','avions','aviez',
    'avaient','eut','eûmes','eûtes','eurent','aie','aies','ait','ayons','ayez','aient','eusse','eusses','eût',
    'eussions','eussiez','eussent','ceci','cela','cet','cette','ici','ils','les','leurs','quel','quels','quelle','quelles',
    'sans','soi'
];

var words_es = [
    'a','un','el','ella','y','sobre','de','la','que','en',
    'los','del','se','las','por','un','para','con','no',
    'una','su','al','lo','como','más','pero','sus','le',
    'ya','o','porque','cuando','muy','sin','sobre','también',
    'me','hasta','donde','quien','desde','nos','durante','uno',
    'ni','contra','ese','eso','mí','qué','otro','él','cual',
    'poco','mi','tú','te','ti','sí',
     '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '_'
     ];

var words_it = [
    'ad','al','allo','ai','agli','all','agl','alla','alle','con','col','coi','da','dal','dallo',
    'dai','dagli','dall','dagl','dalla','dalle','di','del','dello','dei','degli','dell','degl',
    'della','delle','in','nel','nello','nei','negli','nell','negl','nella','nelle','su','sul',
    'sullo','sui','sugli','sull','sugl','sulla','sulle','per','tra','contro','io','tu','lui',
    'lei','noi','voi','loro','mio','mia','miei','mie','tuo','tua','tuoi','tue','suo','sua','suoi',
    'sue','nostro','nostra','nostri','nostre','vostro','vostra','vostri','vostre','mi','ti','ci',
    'vi','lo','la','li','le','gli','ne','il','un','uno','una','ma','ed','se','perché','anche','come',
    'dov','dove','che','chi','cui','non','più','quale','quanto','quanti','quanta','quante','quello',
    'quelli','quella','quelle','questo','questi','questa','queste','si','tutto','tutti','a','c','e',
    'i','l','o','ho','hai','ha','abbiamo','avete','hanno','abbia','abbiate','abbiano','avrò','avrai',
    'avrà','avremo','avrete','avranno','avrei','avresti','avrebbe','avremmo','avreste','avrebbero',
    'avevo','avevi','aveva','avevamo','avevate','avevano','ebbi','avesti','ebbe','avemmo','aveste',
    'ebbero','avessi','avesse','avessimo','avessero','avendo','avuto','avuta','avuti','avute','sono',
    'sei','è','siamo','siete','sia','siate','siano','sarò','sarai','sarà','saremo','sarete','saranno',
    'sarei','saresti','sarebbe','saremmo','sareste','sarebbero','ero','eri','era','eravamo','eravate',
    'erano','fui','fosti','fu','fummo','foste','furono','fossi','fosse','fossimo','fossero','essendo',
    'faccio','fai','facciamo','fanno','faccia','facciate','facciano','farò','farai','farà','faremo',
    'farete','faranno','farei','faresti','farebbe','faremmo','fareste','farebbero','facevo','facevi',
    'faceva','facevamo','facevate','facevano','feci','facesti','fece','facemmo','faceste','fecero',
    'facessi','facesse','facessimo','facessero','facendo','sto','stai','sta','stiamo','stanno','stia',
    'stiate','stiano','starò','starai','starà','staremo','starete','staranno','starei','staresti',
    'starebbe','staremmo','stareste','starebbero','stavo','stavi','stava','stavamo','stavate','stavano',
    'stetti','stesti','stette','stemmo','steste','stettero','stessi','stesse','stessimo','stessero','stando',
     '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '_'
     ];

     var words_ne = [
    'aan', 'af', 'al', 'alles', 'als', 'altijd', 'andere', 'ben', 'bij', 'daar',
    'dan', 'dat', 'de', 'der', 'deze', 'die', 'dit', 'doch', 'doen', 'door', 'dus',
    'een', 'eens', 'en', 'er', 'ge', 'geen', 'geweest', 'haar', 'had', 'heb',
    'hebben', 'heeft', 'hem', 'het', 'hier', 'hij', 'hoe', 'hun', 'iemand', 'iets',
    'ik', 'in', 'is', 'ja', 'je ', 'kan', 'kon', 'kunnen', 'maar', 'me', 'meer',
    'men', 'met', 'mij', 'mijn', 'moet', 'na', 'naar', 'niet', 'niets', 'nog', 'nu',
    'of', 'om', 'omdat', 'ons', 'ook', 'op', 'over', 'reeds', 'te', 'tegen', 'toch',
    'toen', 'tot', 'u', 'uit', 'uw', 'van', 'veel', 'voor', 'want', 'waren', 'was',
    'wat', 'we', 'wel', 'werd', 'wezen', 'wie', 'wij', 'wil', 'worden', 'zal', 'ze',
    'zei', 'zelf', 'zich', 'zij', 'zijn', 'zo', 'zonder', 'zou',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '$', '1',
    '2', '3', '4', '5', '6', '7', '8', '9', '0', '_', '-'
    ];

    var words_en = [
    'about', 'after', 'all', 'also', 'am', 'an', 'and', 'another', 'any', 'are', 'as', 'at', 'be',
    'because', 'been', 'before', 'being', 'between', 'both', 'but', 'by', 'came', 'can',
    'come', 'could', 'did', 'do', 'each', 'for', 'from', 'get', 'got', 'has', 'had',
    'he', 'have', 'her', 'here', 'him', 'himself', 'his', 'how', 'if', 'in', 'into',
    'is', 'it', 'like', 'make', 'many', 'me', 'might', 'more', 'most', 'much', 'must',
    'my', 'never', 'now', 'of', 'on', 'only', 'or', 'other', 'our', 'out', 'over',
    'said', 'same', 'see', 'should', 'since', 'some', 'still', 'such', 'take', 'than',
    'that', 'the', 'their', 'them', 'then', 'there', 'these', 'they', 'this', 'those',
    'through', 'to', 'too', 'under', 'up', 'very', 'was', 'way', 'we', 'well', 'were',
    'what', 'where', 'which', 'while', 'who', 'with', 'would', 'you', 'your',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '$', '1',
    '2', '3', '4', '5', '6', '7', '8', '9', '0', '_'
    ];

    var words_ru = [
    'о', 'после', 'все', 'также', 'и', 'другие', 'все', 'как', 'во', 'быть',
    'потому', 'был', 'до', 'являюсь', 'между', 'все', 'но', 'от', 'иди', 'могу',
    'подойди', 'мог', 'делал', 'делаю', 'каждый', 'для', 'откуда', 'иметь', 'имел',
    'он', 'имеет', 'её', 'здесь', 'его', 'как', 'если', 'в', 'оно', 'за',
    'делать', 'много', 'я', 'может быть', 'более', 'самый', 'должен',
    'мой', 'никогда', 'сейчас', 'из', 'на', 'только', 'или', 'другой', 'другая',
    'другое', 'наше', 'вне', 'конец', 'сказал', 'сказала', 'также', 'видел', 'c',
    'немного', 'все еще', 'так', 'затем', 'тот', 'их', 'там', 'этот', 'они', 'те',
    'через', 'тоже', 'под', 'над', 'очень', 'был', 'путь', 'мы', 'хорошо',
    'что', 'где', 'который', 'пока', 'кто', 'с кем', 'хотел бы', 'ты', 'твои',
    'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н',
    'o', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь',
    'э', 'ю', 'я','$', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '_'
    ];