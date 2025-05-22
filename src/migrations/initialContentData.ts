
import { supabase } from '@/integrations/supabase/client';

export async function seedInitialContent() {
  try {
    // Check if content already exists
    const { count } = await supabase
      .from('content')
      .select('*', { count: 'exact' })
      .eq('page', 'launchpad')
      .eq('section', 'header');
    
    if (count && count > 0) {
      console.log('Initial content data already exists');
      return;
    }
    
    // Insert header content for Launchpad page
    await supabase.from('content').insert({
      page: 'launchpad',
      section: 'header',
      title: 'Python Launchpad',
      description: 'Essential syntax for common tasks, presented as direct Python equivalents to familiar concepts.',
      created_by: null
    });
    
    // Insert code samples for Launchpad page sections
    const codeSections = [
      {
        page: 'launchpad',
        section: 'variables-basic-types',
        code: `# No type declarations required
name = "Python"  # string
age = 30         # integer
price = 19.99    # float
is_valid = True  # boolean (note the capitalization)

# Multiple assignment
x, y, z = 1, 2, 3

# Type checking
print(type(name))  # <class 'str'>
print(type(age))   # <class 'int'>
print(type(price)) # <class 'float'>`
      },
      {
        page: 'launchpad',
        section: 'collections-lists',
        code: `# Creating lists
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]

# Accessing elements (0-indexed)
first = numbers[0]      # 1
last = numbers[-1]      # 5

# Slicing [start:end:step] (end is exclusive)
subset = numbers[1:4]   # [2, 3, 4]
reversed_list = numbers[::-1]  # [5, 4, 3, 2, 1]

# Common methods
numbers.append(6)        # [1, 2, 3, 4, 5, 6]
numbers.insert(1, 10)    # [1, 10, 2, 3, 4, 5, 6]
popped = numbers.pop()   # popped = 6, numbers = [1, 10, 2, 3, 4, 5]
numbers.remove(10)       # [1, 2, 3, 4, 5]
length = len(numbers)    # 5`
      }
    ];
    
    await supabase.from('content').insert(codeSections);
    
    console.log('Successfully seeded initial content');
  } catch (error) {
    console.error('Error seeding content:', error);
  }
}
