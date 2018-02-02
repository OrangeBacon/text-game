extends RichTextLabel

var world_class = preload("res://World.gd")
var current_world

func _ready():
	current_world = world_class.new("Hello, World")
	self.text = current_world.get_overview()
	update()
	set_process(true)
	
func _process(delta):
	if Input.is_action_pressed("ui_accept"):
		current_world = world_class.new("Hello, World")
		self.text = current_world.get_overview()
		update()