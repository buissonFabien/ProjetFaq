require 'rubygems'
require 'sinatra'
# require 'sinatra/reloader'
require 'mongo'
require 'json/ext'
require 'json'
# require 'ruby-tf-idf'

include Mongo

before do
   content_type :json    
   headers 'Access-Control-Allow-Origin'  => '*', 
   		   'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST'],
   		   'Access-Control-Allow-Headers' => 'accept, authorization, origin, Content-Type : json'
end

# set :port, 8080

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

puts "ok"
#################################################
######################GET########################
#################################################
get '/getData' do	
	# @connection = Mongo::Connection.new
	# @db = @connection.db('bddTest')
	# @coll = @db.collection('bddTest')
	# # retourne toute la base au format Json
	# data = @coll.find().to_a.to_json
	db = get_connection
	 
	puts "Collections"
	puts "==========="
	collections = db.collection_names
	puts collections
	data = coll.find().to_a.to_json
	"helloWorld"
	

end


get '/getSearchData/:text' do
	@connection = Mongo::Connection.new
	@db = @connection.db('bddTest')
	@coll = @db.collection('bddTest')
	"helloWorld"

	data = @coll.find({:id => "2" }).to_a.to_json
	puts data
	# puts "parametres: #{params[:text]}"
end


get '/' do
	"helloWorld"
	db = get_connection
	puts "Collections"
	puts "==========="
	collections = db.collection_names
	puts collections
end

#################################################
######################POST#######################
#################################################
post '/post' do
	# data = { id: params[:id], pwd: params[:pwd]}
	# dd = data.to_a
	# puts "Params   : ------ "+dd.to_json
	corp = request.body.string


	@connection = Mongo::Connection.new
	@db = @connection.db('bddTest')
	@coll = @db.collection('bddTest')

	topObject = JSON.parse(corp)
	sections = topObject ["value"]
	# puts sections ["siteid"]
	# puts (sections.length)
	# puts sections
	# puts "..............." 
	articles = sections["KBarticles"]	
	
	$i=0
	begin
   		titre = articles [$i]
		puts titre['title']
		puts titre['category']
		puts titre['keywords']
		puts titre['answer']
		@title	  = titre['title']
		@category = titre['category']
		@keywords = titre['keywords']
		@answer   = titre['answer']
		@rate     = titre['rate']
		@coll.update({ id: '17' },{ '$push' => {'value.KBarticles' =>{ title: @title, category: @category, keywords: @keywords,
																	   answer: @answer, rate: @rate }}})
	   	$i += 1
	   	# puts "**********************"
	end while $i <= sections.length
end