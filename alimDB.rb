#!/usr/bin/ruby

require 'rubygems'
require 'mongo'
require 'json'

include Mongo

# mongodb://<dbuser>:<dbpassword>@ds053429.mongolab.com:53429/heroku_app27880644
# #### Connection a MongoDB ###
# @connection = Mongo::Connection.new
# @db = @connection.db('bddTest')
# @coll = @db.collection('bddTest')

def get_connection
  return @db_connection if @db_connection
  db = URI.parse('mongodb://fab:fab@ds053429.mongolab.com:53429/')
  db_name = 'heroku_app27880644'
  @db_connection = Mongo::Connection.new(db.host, db.port).db(db_name)
  @db_connection.authenticate(db.user, db.password) unless (db.user.nil? || db.user.nil?)
  @db_connection
end

db = get_connection

puts "Collections"
puts "==========="
collections = db.collection_names
puts collections
last_collection = collections[-1]
coll = db.collection(last_collection)

### Test d'insertion d'un document dans la base ###


d1 = {
	:id => '1',
	:title => 'Qui sommes-nous et que proposons-nous ?',
	:categorie => 'Decouvrez LaFourchette ',
	:keywords => 'laFourchette fourchette proposez',
	:answer => 'LaFourchette est un service de reservation de restaurants en ligne gratuit. Mais pas seulement ! Notre mission est de vous proposer un large choix de restaurants classes selon differents criteres pour vous offrir toujours plus d\'inspiration. Profitez egalement de nombreuses promotions et d\'un systeme ultra-fiable pour denicher et reserver les tables qui vous correspondent. LaFourchette existe aussi en Espagne : www.eltenedor.es et en Suisse : www.lafourchette.ch',
	:popular => '1'
}
d2 = {
	:id => '2',
	:title => 'Quels restaurants trouve-t-on sur LaFourchette ?',
	:categorie => 'Restaurants',
	:keywords => 'restaurant',
	:answer => 'LaFourchette vous propose une offre variee de plus 7 000 restaurants de qualite, du bon petit bistrot du coin de la rue aux plus grands restaurants. Une cuisine de qualite, un service efficace et un cadre agreable doivent etre au rendez-vous de toutes vos sorties au restaurant, du brunch entre amis au diner romantique, en passant par le dejeuner d\'affaires.',
	:popular => '1'
}


d3 = {
	:id => '3',
	:title => 'Comment sont-ils selectionnes ?',
	:categorie => 'Restaurants',
	:keywords => 'selection restaurant restaurants',
	:answer => 'Afin de vous garantir une offre variee et fiable, les restaurants doivent tous etre reservables et proposer une prestation de qualite, pour figurer sur LaFourchette. D\'ailleurs, la plupart sont cites ou recommandes par un guide gastronomique. Mais sur LaFourchette, le critique c\'est vous ! En deposant un avis apres avoir reserve, c\'est vous qui guidez les internautes pour les aider a faire leur choix.',
	:popular => '1'
}

d4 = {
	:id => '4',
	:title => 'A quoi correspond la mention de prix "a partir de" ?',
	:categorie => 'Restaurants',
	:keywords => 'restaurant prix',
	:answer => 'Sur chaque fiche restaurant, la mention "a partir de" vous permet de connaitre le montant minimal d\'une addition a regler dans cet etablissement. Il est aussi visible dans la liste des resultats, sous le type de cuisine. Le montant est calcule a partir des prix indiques par le restaurateur, sur la base entree/plat ou plat/dessert, hors boisson et prend en compte les offres disponibles. Il ne peut donc pas etre considere comme contractuel mais vous donne un bon apercu du nombre de piecettes a debourser.',
	:popular => '0'
}

d5 = {
	:id => '5',
	:title => 'Vous ne trouvez pas le restaurant que vous souhaitez ? Faites-nous part de votre suggestion !',
	:categorie => 'Restaurants',
	:keywords => 'trouve restaurant restaurants',
	:answer => 'Vous l\'avez cherche sur LaFourchette mais votre restaurant prefere n\'apparait pas dans la liste des resultats ? Faites nous part de vos suggestions, nous sommes preneurs de vos bonnes adresses ! Pour cela, il vous suffit de cliquer sur le lien "Vous souhaitez peut-etre nous suggerer une bonne adresse ?" qui apparait lorsqu\'aucun resultat ne correspond a votre recherche. Vous pouvez egalement nous ecrire en remplissant le formulaire qui se trouve dans l\'onglet "Contactez-nous" en bas de page. Nous lisons tous vos messages !',
	:popular => '0'
}

d6 = {
	:id => '6',
	:title => 'Comment fonctionne la recherche sur LaFourchette ?',
	:categorie => 'Sur la recherche',
	:keywords => 'recherche',
	:answer => 'Pour trouver un restaurant sur Lafourchette, il vous suffit de completer les champs situes en haut de chaque page : Le champ " ou ? " : vous pourrez ainsi chercher un restaurant selon votre ville, le nom du restaurant, une adresse, un code postal, un quartier ou meme un metro.
	Le champ " quand ? " : en completant les champs " date ", " heure " et " nombre de personnes ", vous pourrez trouver rapidement un restaurant disponible en fonction de vos criteres. 
	Vous n\'avez pas encore fixe de date ? Selectionnez " sans date precise ", dans le champ " date " en bas du calendrier.
	a tout moment vous pourrez affiner votre recherche en accedant a l\'ensemble des filtres situes, dans la colonne a gauche de la page de resultats. Ainsi, une liste de restaurants vous sera proposee en fonction du type de cuisine, de la promotion, du prix par personne, de sa note, des services que vous attendez ou meme du type de restaurant que vous souhaitez.',
	:popular => '0'
}

d7 = {
	:id => '7',
	:title => 'Les restaurants proposes sont-ils disponibles pour mes criteres ?',
	:categorie => 'Sur la recherche',
	:keywords => 'criteres restaurant recherche',
	:answer => 'En completant les champs " date " " heure " et " nombre de personnes " situes en haut de page, vous accedez a une liste de restaurants disponibles pour les criteres choisis. Si vous n\'avez pas rempli ces criteres, les disponibilites des restaurants ne seront pas prises en compte.',
	:popular => '0'
}

d8 = {
	:id => '8',
	:title => 'Pourquoi se geolocaliser ? A quoi sert le picto " ma position actuelle" du moteur de recherche ?',
	:categorie => 'Sur la recherche',
	:keywords => 'geolocalisation geolocaliser position recherche',
	:answer => 'Se geolocaliser permet d\'obtenir la liste des restaurants les plus proches de l\'endroit ou l\'on se trouve : 
	Une icone en forme de cible renvoyant a " Ma position actuelle " se trouve dans le champ " ou " du moteur de recherche. Il permet de se geolocaliser et donc d\'avoir en un clin d\'oeil tous les restaurants autour de soi.
	Mais pour fonctionner, cette geolocalisation doit etre activee ! Pour cela, il faut cliquer sur " Partager sa localisation " dans le pop-up qui s\'ouvre suite a votre clic sur cette meme icone.',
	:popular => '0'
}

d9 = {
	:id => '9',
	:title => 'Quels sont les criteres du " Tri pertinence " dans les listes de resultats ?',
	:categorie => 'Sur la recherche',
	:keywords => 'critere pertinence resultats',
	:answer => 'Le " Tri pertinence " vous permet d\'acceder directement au meilleur de LaFourchette, a travers une selection d\'adresses definie selon plusieurs criteres essentiels : la note, le nombre d\'avis, le niveau de promotion et sa reputation dans les guides. 
	Cependant, vous pouvez tout a fait choisir un autre type de tri (meilleurs notes, distance par rapport a un point donne, etc.)',
	:popular => '0'
}

d10 = {
	:id => '10',
	:title => 'Suite a votre recherche, vous desirez plus de resultats ?',
	:categorie => 'Sur la recherche',
	:keywords => 'recherche resultats',
	:answer => 'Une fois lancee votre recherche en fonction d\'une adresse, d\'une ville, d\'un code postal ou encore d\'un metro, nous adaptons le rayon de la recherche afin que vous ayez un minimum de restaurants proposes. Cependant, si vous le souhaitez, vous pouvez reduire cette distance ou au contraire l\'augmenter pour avoir plus de resultats. Pour cela, deplacez le curseur du " Rayon de recherche " dans la colonne de gauche de votre page de resultats.',
	:popular => '0'
}

d11 = {
	:id => '11',
	:title => 'Le format liste ne vous convient pas ?',
	:categorie => 'Sur la recherche',
	:keywords => 'liste format resultats',
	:answer => 'Vous pouvez facilement avoir une vue d\'ensemble des restaurants sur une carte en cliquant sur " Voir sur un plan ", en haut a gauche de la page. Et vous pourrez affiner votre recherche de la meme maniere qu\'avec le format liste !',
	:popular => '0'
}

d12 = {
	:id => '12',
	:title => 'Comment rechercher par type de cuisine ?',
	:categorie => 'Quelques astuces sur la recherche',
	:keywords => 'recherche cuisine',
	:answer => 'Apres avoir fait votre recherche, il vous suffit de selectionner le type de cuisine que vous souhaitez dans la colonne a gauche de la liste de restaurants proposes.',
	:popular => '0'
}

d13 = {
	:id => '13',
	:title => 'Comment rechercher un restaurant avec une promotion ?',
	:categorie => 'Quelques astuces sur la recherche',
	:keywords => 'promotion recherche restaurant restaurants',
	:answer => 'Vous pouvez trier vos resultats par " Promotions " depuis le menu deroulant, en haut a droite de la page. Cela vous permet d\'afficher les meilleures promotions parmi les adresses proposees. Vous pouvez aussi choisir le type de promotion qui vous interesse dans la colonne a gauche de la liste de restaurants ou meme filtrer vos restaurants pour n\'afficher que ceux qui proposent une reduction et ce, en cochant la case " Toutes les promotions ".',
	:popular => '0'
}

d14 = {
	:id => '14',
	:title => 'Comment retrouver des restaurants avec une ambiance particuliere ?',
	:categorie => 'Quelques astuces sur la recherche',
	:keywords => 'restaurants restaurants ambiance particuliere',
	:answer => 'Comme pour le type de cuisine ou la promotion, il vous suffit de selectionner l\'ambiance que vous souhaitez dans la categorie " Cadre " ou " Type de restaurant ", dans la colonne a gauche de la liste de restaurants proposes.',
	:popular => '0'
}

d15 = {
	:id => '15',
	:title => 'J\'ai une occasion speciale. Avez-vous des restaurants qui acceptent les evenements ?',
	:categorie => 'Quelques astuces sur la recherche',
	:keywords => 'occasion speciale restaurants evenements',
	:answer => 'Oui, vous pouvez facilement trouver un restaurant pour une occasion speciale dans la categorie " Pour un evenement ", situee en bas de la colonne a gauche de la liste de restaurants proposes.',
	:popular => '0'
}

d16 = {
	:id => '16',
	:title => 'Pas d\'inspiration ? Laissez-vous guider par nos selections !',
	:categorie => 'Quelques astuces sur la recherche',
	:keywords => 'selections inspiration recherche',
	:answer => 'Vous vivez dans une grande ville ? Alors rendez-vous sur la page principale de votre ville et laissez-vous tenter par nos encarts " Les restaurants les mieux notes ", " Les meilleurs promotions ", " Les must de LaFourchette "... et beaucoup d\'autres !',
	:popular => '0'
}


key = 'https://dev2.easiware.fr/7.2/easicrm.5.0.dev'
d17 =	{
			:id => '17',
			:key => key,
		  	:value => {
		    	:siteid  => 'easicrm.5.0.dev',
		   		:KBarticles => [
		   		
			        
		      	]
			}
		}

coll.insert(d1)
coll.insert(d2)
coll.insert(d3)
coll.insert(d4)
coll.insert(d5)
coll.insert(d6)
coll.insert(d7)
coll.insert(d8)
coll.insert(d9)
coll.insert(d10)
coll.insert(d11)
coll.insert(d12)
coll.insert(d13)
coll.insert(d14)
coll.insert(d15)
coll.insert(d16)

$i=0


# begin

# 	$title = "titre "+ $i.to_s
# 	$cat = "cat "+$i.to_s
# 	$keywords = "keywords "+$i.to_s
# 	$answer = "answer "+$i.to_s
	
# 	d={
# 		:id => $i,
# 		:title => $title,
# 		:categorie => $cat,
# 		:keywords => $keywords,
# 		:answer => $answer,
# 		:popular => '0'
# 	}
# 	@coll.insert(d)	
#    	$i += 1
# end while $i <150
### Fermeture du fichier ###
# fr.close

