
Vagrant.configure("2") do |config|

  config.vm.box = "zoid/ubuntu-server-18.04-docker"
  config.vm.box_version = "0.1"

## Ports to be exposed:
## 9200 - ElasticSearch 1st node
## 9100 - Head app, to easily access ElasticSearch indices
## 5601 - Kibana 
  config.vm.network "forwarded_port", guest: 9200, host: 9200
  config.vm.network "forwarded_port", guest: 9100, host: 9100
  config.vm.network "forwarded_port", guest: 5601, host: 5601

   config.vm.provider "virtualbox" do |vb|
     vb.memory = "2048"
   end

end
