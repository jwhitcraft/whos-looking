if Gem::Specification::find_all_by_name('rainbow', '>= 2.0.0').any?
  require 'rainbow/ext/string'
end

class String
  def color(fg = nil, bg = nil, effects = [])
    #make sure we can actually colorize the text
    unless String.method_defined? :foreground
      return self
    end

    str = self
    unless fg.nil?
      str = str.foreground(fg)
    end

    unless bg.nil?
      str = str.background(bg)
    end

    if effects.length > 0
      effects.each { |e|
        str = str.send(e)
      }
    end

    str
  end
end


desc 'Build SugarCRM Package'
task :build_package do
  package_name = "WhosWatching_v-" + Time.now.strftime("%Y%m%d")
  pubdate = Time.now.strftime('%Y-%m-%d %H:%I:%S')
    print 'Removing Old Builds...'
    ok_failed system("rm -rf WhosWatching_v*")
    print "Setting Publish Date to #{pubdate}..."
    ok_failed system("sed -i 's/{{pub_date}}/#{pubdate}/g' sugarcrm_client/manifest.php")
    print "Building Package: #{package_name}..."
    ok_failed system("cd sugarcrm_client; zip -qq -r ../#{package_name}.zip * -x '*.DS_Store'")
    `git checkout -- sugarcrm_client/manifest.php`
end


##################
# Methods
##################
def get_stdin(message)
  print message
  STDIN.gets.chomp
end

def ok_failed(condition)
  if (condition)
    puts 'OK'
  else
    puts 'FAILED'
  end
end
