
var name = "MyWorld"
var countries = []
var chain = preload("res://MarkovChain.cs")

func _init(name):
	self.name = name
	for i in range(rand_range(5, 20)):
		countries.append(i)
	chain = chain.new()
	
func get_name():
	return self.name

func get_countries():
	return self.countries

func get_overview():
	return PoolStringArray([
		"Planet name: %s" % self.name,
		"Countries: %d" % countries.size()
	]).join("\n")