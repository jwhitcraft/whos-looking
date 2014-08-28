desc 'Build SugarCRM Package'
task :build_package do
  timestamp = Time.now.strftime("%Y%m%d")
    `cd sugarcrm_client; zip -r ../WhosWatching_v-#{timestamp}.zip * -x "*.DS_Store"`
end
